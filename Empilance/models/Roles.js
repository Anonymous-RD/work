import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";

// Joi Validation Schema
const roleValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),

  desc: Joi.string().required().trim().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "any.required": `"description" is a required field`,
  }),

  department: Joi.string().required().trim().messages({
    "string.base": `"department" should be a type of 'text'`,
    "string.empty": `"department" cannot be an empty field`,
    "any.required": `"department" is a required field`,
  }),

  modularPermission: Joi.array().optional().items(Joi.string()).messages({
    "array.base": `"modularPermission" should be an array of strings`,
  }),

  functionalPermissionToAdd: Joi.array()
    .optional()
    .items(Joi.string())
    .messages({
      "array.base": `"functionalPermissionToAdd" should be an array of strings`,
    }),

  functionalPermissionToUpdate: Joi.array()
    .optional()
    .items(Joi.string())
    .messages({
      "array.base": `"functionalPermissionToUpdate" should be an array of strings`,
    }),

  functionalPermissionToDelete: Joi.array()
    .optional()
    .items(Joi.string())
    .messages({
      "array.base": `"functionalPermissionToDelete" should be an array of strings`,
    }),

  otherFunctionalPermission: Joi.array()
    .optional()
    .items(Joi.string())
    .messages({
      "array.base": `"otherFunctionalPermission" should be an array of strings`,
    }),

  isActive: Joi.boolean().optional().default(true).messages({
    "boolean.base": `"isActive" should be a boolean`,
  }),
  jwtInfo: Joi.object().required().messages({
    "object.base": `"jwtInfo" must be an object`,
    "any.required": `"jwtInfo" is required`,
  }),
  metadata: Joi.object().default({}).messages({
    "object.base": `"metadata" should be an object`,
  }),
});

// Mongoose Schema
const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  department: { type: String, required: true },
  modularPermission: { type: Array },
  functionalPermissionToAdd: { type: Array },
  functionalPermissionToUpdate: { type: Array },
  functionalPermissionToDelete: { type: Array },
  otherFunctionalPermission: { type: Array },
  metadata: { type: MetaDataSchema, default: () => ({}) },
  isActive: { type: Boolean, default: true },
});

// Create Role method with validation
RoleSchema.statics.createRole = async (data, createdBy) => {
  try {
    // Validate data using Joi schema
    const { error } = roleValidationSchema.validate(data);
    if (error) {
      // Throw validation error
      error.details.forEach((detail) => {
        throw new Error(detail.message);
      });
    }

    const createRole = new Roles(data);
    createRole.metadata = createRole.metadata || {};
    createRole.metadata.createdBy = createdBy;
    await createRole.save();

    return createRole;
  } catch (error) {
    logger.info(`Failed to create role. Error: ${error.message}`);
    throw new Error(error.message);
  }
};

// Virtual field for permissions
RoleSchema.virtual("permissions").get(function () {
  let permission = [
    ...this.modularPermission,
    ...this.functionalPermissionToAdd,
    ...this.functionalPermissionToDelete,
    ...this.functionalPermissionToUpdate,
    ...this.otherFunctionalPermission,
  ];

  return permission;
});

// Set toJSON for virtuals to be included in the output
RoleSchema.set("toJSON", { virtuals: true });

// Create the Roles model
const Roles = mongoose.model("Roles", RoleSchema);

export default Roles;
