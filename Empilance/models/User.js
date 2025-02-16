import mongoose from "mongoose";
import bcrypt from "bcrypt";
import MetaDataSchema from "./Metadata.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import fs from "fs";
import config from "../config/config.js";
import CryptoJS from "crypto-js";
import permissionController from "../controllers/admin/permissionController.js";
import Roles from "./Roles.js";
import logger from "../config/logger.js";

const privateKey = fs.readFileSync(process.env.RSA_PRIVATE_KEY_PATH, "utf-8");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
  },
  userType: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    contactInfo: {
      phone: {
        countryCode: { type: String, required: true },
        number: { type: String, required: true },
      },
      address: {
        street: String,
        city: String,
        state: String,
        zip: String,
      },
    },
  },
  lastLogin: { type: Date, default: null },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null },
  lastFailedLogin: { type: Date, default: null },
  passwordHistory: [String],
  metadata: { type: MetaDataSchema, default: () => ({}) },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ["new", "active", "archived"], default: "new" },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", default: null },
});
const joiUserValidationSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z][a-zA-Z0-9_-]{2,29}$/) // Username must start with a letter and can have letters, numbers, underscores, or hyphens, length 3-30
    .required()
    .messages({
      "string.base": `"username" must be a string`,
      "string.empty": `"username" cannot be empty`,
      "string.pattern.base": `"username" must start with a letter and can only contain letters, numbers, underscores, or hyphens (3-30 characters long)`,
      "any.required": `"username" is required`,
    }),

  userType: Joi.string().valid("user", "admin").default("admin").messages({
    "string.base": `"userType" must be a string`,
    "any.only": `"userType" must be one of the following values: 'user', 'admin'`,
  }),

  profile: Joi.object({
    firstName: Joi.string().min(1).max(50).required().messages({
      "string.base": `"firstName" must be a string`,
      "string.empty": `"firstName" cannot be empty`,
      "string.min": `"firstName" must be at least 1 character long`,
      "string.max": `"firstName" must be less than or equal to 50 characters`,
      "any.required": `"firstName" is required`,
    }),

    lastName: Joi.string().min(1).max(50).required().messages({
      "string.base": `"lastName" must be a string`,
      "string.empty": `"lastName" cannot be empty`,
      "string.min": `"lastName" must be at least 1 character long`,
      "string.max": `"lastName" must be less than or equal to 50 characters`,
      "any.required": `"lastName" is required`,
    }),

    email: Joi.string().email().required().messages({
      "string.base": `"email" must be a string`,
      "string.empty": `"email" cannot be empty`,
      "string.email": `"email" must be a valid email address`,
      "any.required": `"email" is required`,
    }),

    contactInfo: Joi.object({
      phone: Joi.object({
        countryCode: Joi.string().min(1).max(5).required().messages({
          "string.base": `"countryCode" must be a string`,
          "string.empty": `"countryCode" cannot be empty`,
          "string.min": `"countryCode" must be at least 1 character long`,
          "string.max": `"countryCode" must be at most 5 characters long`,
          "any.required": `"countryCode" is required`,
        }),

        number: Joi.string().pattern(/^\d+$/).required().messages({
          "string.base": `"number" must be a string`,
          "string.empty": `"number" cannot be empty`,
          "string.pattern.base": `"number" must contain only digits`,
          "any.required": `"number" is required`,
        }),
      }).required(),

      address: Joi.object({
        street: Joi.string().allow(""),
        city: Joi.string().allow(""),
        state: Joi.string().allow(""),
        zip: Joi.string().pattern(/^\d+$/).allow("").messages({
          "string.base": `"zip" must be a string`,
          "string.pattern.base": `"zip" must contain only digits`,
        }),
      }),
    }).required(),
  }),

  roleId: Joi.string().default(null).messages({
    "string.base": `"roleId" must be a string`,
  }),

  jwtInfo: Joi.object().required().messages({
    "object.base": `"jwtInfo" must be an object`,
    "any.required": `"jwtInfo" is required`,
  }),

  isActive: Joi.boolean().default(true).messages({
    "boolean.base": `"isActive" must be a boolean value`,
  }),

  status: Joi.string()
    .valid("new", "active", "archived")
    .default("new")
    .messages({
      "string.base": `"status" must be a string`,
      "any.only": `"status" must be one of the following values: 'new', 'active', 'archived'`,
    }),

  metadata: Joi.object()
    .default(() => ({}))
    .messages({
      "object.base": `"metadata" must be an object`,
    }),
});

userSchema.pre("save", async function (next) {
  if (this.isNew && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordHistory.push(this.password);
  }
  next();
});
// Validate using Joi before saving
userSchema.statics.validateUserData = (data) => {
  return joiUserValidationSchema.validate(data);
};
// Exclude the password field from the JSON output
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Remove password field
    delete ret.userType; // Remove user type field
    delete ret.passwordHistory; // Remove password history field
    return ret;
  },
});

//Compares encrypted password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Decrypting encrypted input
userSchema.methods.decryptInput = async function (encryptedData) {
  return CryptoJS.AES.decrypt(
    encryptedData,
    process.env.BASIC_AUTH_SECRET
  ).toString(CryptoJS.enc.Utf8);
};

// Method to check password against history
userSchema.methods.isPasswordInHistory = async function (newPassword) {
  for (let oldPasswordHash of this.passwordHistory) {
    const match = await bcrypt.compare(newPassword, oldPasswordHash);
    if (match) return true; // Password is in history
  }
  return false;
};

// Method to update password and history
userSchema.methods.updatePassword = async function (newPassword) {
  const saltRounds = 10;
  const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

  // Add the current password to the history array
  this.passwordHistory.push(newPasswordHash);

  // Keep only the last 5 passwords
  if (this.passwordHistory.length > 5) {
    this.passwordHistory.shift(); // Remove the oldest password
  }

  // Update the user's password
  this.password = newPasswordHash;

  await this.save();
};

userSchema.statics.updateLastLogin = function updateLastLogin(userId) {
  return this.findById(userId)
    .exec()
    .then((user) => {
      user.lastLogin = new Date();
      return user.save();
    });
};

userSchema.statics.getUserDataForApi = async function (user) {
  try {
    const permissions = await permissionController.fetchUserRoles(user._id);

    if (!permissions || !permissions[0]) {
      throw new Error("Permissions not found or invalid format.");
    }

    const payload = {
      id: user._id,
      userType: permissions[0].userType,
      modularPermissions: permissions[0].modularPermissions,
      functionalPermissions: permissions[0].functionalPermissions,
    };

    const token = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: config.jwtExpireTime,
    });

    const userData = {
      userId: user._id,
      id: user._id,
      lastLogin: user.lastLogin,
      isActive: user.isActive,
      email: user.profile?.email || "",
      userName: user.username || "",
      lastName: user.profile?.lastName || "",
      firstName: user.profile?.firstName || "",
      name: `${user.profile?.firstName || ""} ${user.profile?.lastName || ""}`,
      status: user.status,
      accessToken: token,
    };

    return userData;
  } catch (error) {
    console.error("Error in getUserDataForApi:", error.message);
    throw new Error("An error occurred while generating user data.");
  }
};

//Create users
userSchema.statics.createUser = async (data) => {
  try {
    const createUser = new User(data);
    createUser.userType = "user";
    createUser.metadata = createUser.metadata || {};
    createUser.metadata.createdBy = data.jwtInfo.jwtId;
    await createUser.save();

    return createUser;
  } catch (error) {
    logger.info(`Failed to create user. Error : ${error.message}`);
    throw new Error("Failed to create user.");
  }
};

userSchema.virtual("userPermissions").get(async function () {
  const roleData = await Roles.findById(this.roleId);
  return roleData;
});

userSchema.set("toJSON", { virtuals: true });
const User = mongoose.model("User", userSchema);

export default User;
