import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";

// Validation regex for PAN and GST numbers
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN Number format: AAAAA9999A
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/; // GST Number format: 12ABCDE1234Z1Z5


// Joi validation schema
const vendorValidationSchema = Joi.object({
  vendorId: Joi.string().required().trim().messages({
    "string.base": `"vendorId" should be a type of 'text'`,
    "string.empty": `"vendorId" cannot be an empty field`,
    "any.required": `"vendorId" is a required field`,
  }),

  name: Joi.string().required().trim().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),

  legalStatusOfVendor: Joi.string().optional().trim().messages({
    "string.base": `"legalStatusOfVendor" should be a type of 'text'`,
    "string.empty": `"legalStatusOfVendor" cannot be an empty field`,
  }),

  taxNumber: Joi.string().optional().trim().messages({
    "string.base": `"taxNumber" should be a type of 'text'`,
    "string.empty": `"taxNumber" cannot be an empty field`,
  }),

  country: Joi.string().optional().trim().messages({
    "string.base": `"country" should be a type of 'text'`,
    "string.empty": `"country" cannot be an empty field`,
  }),

  vendorCategory: Joi.string().optional().trim().messages({
    "string.base": `"vendorCategory" should be a type of 'text'`,
    "string.empty": `"vendorCategory" cannot be an empty field`,
  }),

  // panNumber: Joi.string().pattern(panRegex).optional().trim().messages({
  //   "string.base": `"panNumber" should be a type of 'text'`,
  //   "string.empty": `"panNumber" cannot be an empty field`,
  //   "string.pattern.base": `"panNumber" must be in a valid PAN format (AAAAA9999A)`,
  // }),

  // gstNumber: Joi.string().pattern(gstRegex).optional().trim().messages({
  //   "string.base": `"gstNumber" should be a type of 'text'`,
  //   "string.empty": `"gstNumber" cannot be an empty field`,
  //   "string.pattern.base": `"gstNumber" must be in a valid GST format (12ABCDE1234Z1Z5)`,
  // }),

  rttStatus: Joi.string()
    // .valid("active", "inactive")
    // .default("inactive")
    .messages({
      "string.base": `"rttStatus" should be a type of 'text'`,
      // "any.only": `"rttStatus" must be one of ['active', 'inactive']`,
      "string.empty": `"rttStatus" cannot be an empty field`,
    }),

  assessmentStatus: Joi.string()
    // .valid("pending", "approved", "rejected")
    // .default("pending")
    .messages({
      "string.base": `"assessmentStatus" should be a type of 'text'`,
      // "any.only": `"assessmentStatus" must be one of ['pending', 'approved', 'rejected']`,
      "string.empty": `"assessmentStatus" cannot be an empty field`,
    }),

  activityOutsourced: Joi.string()
    // .valid("yes", "no")
    // .default("no")
    .messages({
      "string.base": `"activityOutsourced" should be a type of 'text'`,
      // "any.only": `"activityOutsourced" must be one of ['yes', 'no']`,
      "string.empty": `"activityOutsourced" cannot be an empty field`,
    }),

  // department: Joi.string().required().trim().messages({
  //   "string.base": `"department" should be a type of 'text'`,
  //   "string.empty": `"department" cannot be an empty field`,
  //   "any.required": `"department" is a required field`,
  // }),

  spocName: Joi.string().optional().trim().messages({
    "string.base": `"spocName" should be a type of 'text'`,
    "string.empty": `"spocName" cannot be an empty field`,
  }),

  spocNumber: Joi.number().optional().messages({
    "number.base": `"spocNumber" should be a type of 'Number'`,
    "number.empty": `"spocNumber" cannot be an empty field`,
  }),
  jwtInfo: Joi.object().required().messages({
    "object.base": `"jwtInfo" must be an object`,
    "any.required": `"jwtInfo" is required`,
  }),
  metadata: Joi.object().default({}).messages({
    "object.base": `"metadata" should be an object`,
  }),

  isActive: Joi.boolean().default(true).messages({
    "boolean.base": `"isActive" should be a boolean`,
  }),
});

// Mongoose schema for vendor
const vendorSchema = new mongoose.Schema({
  vendorId: {
    type: String,
    required: true,
    unique: true, // Ensure unique vendorId
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Vendor name is required"], // Custom error message
    trim: true,
  },
  legalStatusOfVendor: {
    type: String,
    required: [true, "Legal status of vendor is required"], // Custom error message
    trim: true,
  },
  taxNumber: {
    type: String,
    required: [true, "Tax number is required"], // Custom error message
    trim: true,
  },
  country: {
    type: String,
    required: [true, "Country is required"], // Custom error message
    trim: true,
  },
  vendorCategory: {
    type: String,
    required: [true, "Vendor category is required"], // Custom error message
    trim: true,
  },
  // panNumber: {
  //   type: String,
  //   match: [panRegex, "Invalid PAN number format"], // Validate PAN number format
  //   required: true,
  //   trim: true,
  // },
  // gstNumber: {
  //   type: String,
  //   match: [gstRegex, "Invalid GST number format"], // Validate GST number format
  //   required: true,
  //   trim: true,
  // },
  rttStatus: {
    type: String,
    // enum: ["active", "inactive"],
    // default: "inactive",
  },
  assessmentStatus: {
    type: String,
    // enum: ["pending", "approved", "rejected"],
    // default: "pending",
  },
  activityOutsourced: {
    type: String,
    // enum: ["yes", "no"],
    // default: "no",
    required: true,
  },
  // department: {
  //   type: String,
  //   required: [true, "Department is required"], // Custom error message
  //   trim: true,
  // },
  spocName: {
    type: String,
    required: true,
    trim: true,
  },
  spocNumber: {
    type: Number,
    required: true,
    trim: true,
  },
  metadata: {
    type: MetaDataSchema,
    default: () => ({}),
  },
  status: {
    type: String,
    enum: ["in-process", "active", "inactive","offboarded"],
    default: "in-process",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Static method for creating a vendor with Joi validation
vendorSchema.statics.createVendor = async (data) => {
  try {
    // Validate data using Joi schema
    const { error } = vendorValidationSchema.validate(data);
    if (error) {
      // Throw each validation error individually
      error.details.forEach((detail) => {
        throw new Error(detail.message);
      });
    }

    const createVendor = new Vendor(data);
    createVendor.metadata = createVendor.metadata || {};
    createVendor.metadata.createdBy = data.jwtInfo.jwtId;
    await createVendor.save();

    return createVendor;
  } catch (error) {
    logger.info(`Failed to create vendor. Error: ${error.message}`);
    throw new Error(error.message);
  }
};

// Ensure the schema's JSON output includes virtuals
vendorSchema.set("toJSON", { virtuals: true });

// Create Vendor model
const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
