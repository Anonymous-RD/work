import User from "../../models/User.js";
import logger from "../../config/logger.js";
import isValid from "../../util.js";
import mongoose from "mongoose";
import { httpStatus, sendResponse } from "../../util/util.js";
import Roles from "../../models/Roles.js";
import {
  sendUserCreatedEmail,
  reSendUserCreatedEmail,
} from "../../lib/email/emailConfig.js";
const userController = {};

const checkId = async (id) => {
  const validId = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);

  if (!isValid(id) || validId.length === 0) return true;
  else return false;
};

const generateRandomPassword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_+";
  let password = "";
  let hasLetter = false;
  let hasNumber = false;
  let hasSpecial = false;

  while (!(hasLetter && hasNumber && hasSpecial)) {
    password = "";
    hasLetter = hasNumber = hasSpecial = false;

    for (let i = 0; i < length; i++) {
      const char = charset[Math.floor(Math.random() * charset.length)];
      password += char;
      if (/[a-zA-Z]/.test(char)) hasLetter = true;
      else if (/[0-9]/.test(char)) hasNumber = true;
      else if (/[^a-zA-Z0-9]/.test(char)) hasSpecial = true;
    }
  }

  return password;
};

//Creates admin user
userController.createUser = async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = User.validateUserData(req.body);
    if (error) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        error.details[0].message
      );
    }
    const { username, password, profile, roleId, userType } = req.body;
    const { firstName, lastName, email, contactInfo } = profile;

    // Check if roleId is valid
    const validRole = await Roles.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(roleId) } },
    ]);
    if (roleId && validRole.length === 0) {
      logger.error(`RoleId invalid ${roleId}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "RoleId invalid.");
    }

    // Validation for required fields
    if (!username || !profile) {
      logger.info("Profile details required");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Profile details required"
      );
    }
    if (!password && userType === "admin") {
      logger.info("If userType is admin then password is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "If userType is admin then password is required."
      );
    } else if (!firstName || !lastName || !email || !contactInfo) {
      logger.info("Profile information missing");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Profile information missing"
      );
    }

    // Check if username or email already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      logger.error(`User with username '${username}' already exists.`);
      return sendResponse(
        res,
        httpStatus.CONFLICT,
        `Username '${username}' is already taken. Please choose a different one.`
      );
    }

    const existingEmail = await User.findOne({ "profile.email": email });
    if (existingEmail) {
      logger.error(`User with email '${email}' already exists.`);
      return sendResponse(
        res,
        httpStatus.CONFLICT,
        `Email '${email}' is already registered. Please use a different email.`
      );
    }

    // Generate password if userType is "user"
    let userPassword = password;
    if (userType === "user") {
      userPassword = generateRandomPassword();
      logger.info(`Generated password for user: ${userPassword}`);
    }

    // Prepare user data
    const userData = { ...req.body, password: userPassword };

    // Create user
    logger.info(`Creating user for ${req.body.jwtInfo.jwtId}.`);
    const savedUser = await User.createUser(userData);

    // Retrieve user without sensitive fields
    const createdUser = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(savedUser._id) } },
      {
        $project: {
          password: 0,
          lastLogin: 0,
          failedLoginAttempts: 0,
          lockoutUntil: 0,
          lastFailedLogin: 0,
          passwordHistory: 0,
          metadata: 0,
          userPermissions: 0,
        },
      },
    ]);

    logger.info(
      `User ${createdUser[0].profile.firstName} with ID ${createdUser[0]._id} created successfully.`
    );
    if (userType === "user") {
      // Send email after user is created
      await sendUserCreatedEmail(
        email,
        createdUser[0].profile.firstName,
        createdUser[0].username,
        userType==="admin"?password:userPassword
      );
    }
    return sendResponse(
      res,
      httpStatus.CREATED,
      "User created successfully",
      createdUser
    );
  } catch (error) {
    logger.error(`Error occurred while creating user: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Updates the admin user
userController.updateUser = async (req, res) => {
  try {
    const userData = req.body;
    const { id } = req.body;
    const updatedBy = req.body.jwtInfo.jwtId;

    // Validate the user ID
    if (await checkId(id)) {
      logger.error(`User ID ${id} is invalid.`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "User ID is invalid");
    }

    // Validate the role ID if provided
    if (userData.roleId) {
      const validRole = await Roles.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userData.roleId) } },
      ]);

      if (validRole.length === 0) {
        logger.error(`Role ID ${userData.roleId} is invalid.`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Role ID is invalid.");
      }
    }

    logger.info(`Updating user ${id} by ${updatedBy}.`);
    const updateOperations = {
      username: { $ifNull: [userData.username, "$username"] },
      questionBank: { $setUnion: ["$questionBank", userData.questionBank] },
      "profile.firstName": {
        $ifNull: [userData.profile?.firstName, "$profile.firstName"],
      },
      "profile.lastName": {
        $ifNull: [userData.profile?.lastName, "$profile.lastName"],
      },
      "profile.email": {
        $ifNull: [userData.profile?.email, "$profile.email"],
      },
      "profile.contactInfo.phone.countryCode": {
        $ifNull: [
          userData.profile?.contactInfo?.phone?.countryCode,
          "$profile.contactInfo.phone.countryCode",
        ],
      },
      "profile.contactInfo.phone.number": {
        $ifNull: [
          userData.profile?.contactInfo?.phone?.number,
          "$profile.contactInfo.phone.number",
        ],
      },
      "profile.contactInfo.address": {
        $ifNull: [
          userData.profile?.contactInfo?.address,
          "$profile.contactInfo.address",
        ],
      },
      roleId: {
        $ifNull: [new mongoose.Types.ObjectId(userData.roleId), "$roleId"],
      },
      "metadata.updatedBy": updatedBy,
      "metadata.updatedAt": new Date(),
    };
    await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          userType: "user",
        },
      },
      {
        $set: updateOperations,
      },
      {
        $merge: {
          into: "users",
          on: "_id",
          whenMatched: "merge",
          whenNotMatched: "discard",
        },
      },
    ]);

    // Retrieve the updated user data to return in the response
    const userUpdated = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          password: 0,
          passwordHistory: 0,
          lastLogin: 0,
          failedLoginAttempts: 0,
          lockoutUntil: 0,
          lastFailedLogin: 0,
          metadata: 0,
        },
      },
    ]);

    logger.info(`User with ID ${id} updated by ${updatedBy}.`);
    return sendResponse(res, httpStatus.ACCEPTED, "User updated.", userUpdated);
  } catch (error) {
    logger.error(`Error occurred while updating: ${error.message}`);
    return sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      `Error occurred while updating: ${error.message}`
    );
  }
};

//Deletes the respective user
userController.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (await checkId(id)) {
      logger.error(`User id: ${id} is not valid.`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "User id is invalid");
    }

    //Deletes the user
    const userDeleted = await User.findByIdAndUpdate(id, {
      isActive: false,
      status: "archived",
    });

    logger.info(
      `User with id: ${id} and username: ${userDeleted.username} deleted.`
    );
    return sendResponse(res, httpStatus.ACCEPTED, "User deleted");
  } catch (error) {
    logger.error(`Error occured during deleting ${id} : ${error.message}.`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Gets all the user irrespective of their roles
userController.getAllUser = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const {
      page = 1,
      limit = process.env.Page_Limit,
      username,
      isActive,
    } = req.query;

    const skip = (page - 1) * limit;

    // Construct the match condition based on provided filters
    const matchConditions = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: isActive === "false" ? false : true,
      userType: "user",
    };

    // Add username filter if provided
    if (username) {
      matchConditions.username = { $regex: username, $options: "i" };
    }

    // Count the total number of matching users
    const totalItems = await User.countDocuments(matchConditions);

    const userData = await User.aggregate([
      { $match: matchConditions },
      {
        $project: {
          password: 0,
          passwordHistory: 0,
          failedLoginAttempts: 0,
          lockoutUntil: 0,
          lastFailedLogin: 0,
          metadata: 0,
        },
      },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ]);

    const response = {
      users: userData,
      totalItems,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };

    logger.info(`All users listed on page ${page}: ${userData}`);
    return sendResponse(res, httpStatus.OK, "All users:", response);
  } catch (error) {
    logger.error(
      `Error occurred while fetching all users of ${req.body.jwtInfo.jwtId}: ${error.message}.`
    );
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Get a user irrespective of their role
userController.getUserById = async (req, res) => {
  try {
    if (await checkId(req.params.userId)) {
      logger.error(`User id ${req.params.userId} is invalid.`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "User id is invalid");
    }

    logger.info(`Fetching user details of ${req.params.userId}.`);
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.userId),
          isActive: true,
          userType: "user",
        },
      },
      {
        $project: {
          password: 0,
          passwordHistory: 0,
          roleId: 0,
          lastLogin: 0,
          failedLoginAttempts: 0,
          lockoutUntil: 0,
          lastFailedLogin: 0,
          metadata: 0,
        },
      },
    ]);

    logger.info(`User details of ${req.params.userId}.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "User details fetched successfully",
      user[0]
    );
  } catch (error) {
    logger.error(
      `Error occured while fetching user details of ${req.params.userId}: ${error.message}.`
    );
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

userController.reSendEmailByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (await checkId(userId)) {
      logger.error(`User ID ${userId} is invalid.`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "User ID is invalid");
    }

    logger.info(`Fetching user for email sending with ID: ${userId}`);
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
      isActive: true,
    });

    if (!user) {
      logger.error(`No active user found with ID ${userId}`);
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        "User not found or inactive"
      );
    }

    const { firstName, email } = user.profile;
    const { username } = user;
    await reSendUserCreatedEmail(email, firstName, username);

    logger.info(`Email sent successfully to user ID: ${userId}`);
    return sendResponse(
      res,
      httpStatus.OK,
      `Email sent successfully to ${email}`
    );
  } catch (error) {
    logger.error(
      `Error sending email for user ID ${req.params.userId}: ${error.message}`
    );
    return sendResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default userController;
