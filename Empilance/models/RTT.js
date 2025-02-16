import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";
import { v4 } from "uuid";

// Joi Validation Schema
const rttValidationSchema = Joi.object({
  vendorId: Joi.string().required().messages({
    "string.base": `"vendorId" should be a valid ObjectId`,
    "any.required": `"vendorId" is a required field`,
  }),
  rttQuesId: Joi.string().required().messages({
    "string.base": `"rttQuesId" should be a valid ObjectId`,
    "any.required": `"rttQuesId" is a required field`,
  }),
  workflowId: Joi.string().required().messages({
    "string.base": `"workflowId" should be a valid ObjectId`,
    "any.required": `"workflowId" is a required field`,
  }),
  status: Joi.string()
    .valid("initiated", "in-progress", "completed")
    .default("initiated")
    .messages({
      "string.base": `"status" should be a string`,
      "any.only": `"status" must be one of [initiated, in-progress, completed]`,
    }),
  initiatedDate: Joi.date()
    .default(() => new Date())
    .messages({
      "date.base": `"initiatedDate" should be a valid date`,
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

// Mongoose Schema
const rttSchema = new mongoose.Schema({
  rttId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  rttQuesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionBank",
    required: true,
  },
  workflowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkFlow",
    required: true,
  },
  status: {
    type: String,
    enum: ["initiated", "in-progress", "completed"],
    default: "initiated",
  },
  formPath: {
    type: String,
    default: null,
  },
  submitLog: {
    type: Map,
    of: Number,
    default: {},
  },
  expireAt: {
    type: Date,
    default: function () {
      const expireDays = Number(process.env.EXPIRE_FORM_PATH_DAYS);
      const expireTime = new Date();
      expireTime.setDate(expireTime.getDate() + expireDays);
      return expireTime;
    },
  },
  initiatedDate: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: MetaDataSchema,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Validation Helper Function
const validateRTTData = (data) => {
  const { error } = rttValidationSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    throw new Error(errorMessage);
  }
};

// Create RTT method with validation
rttSchema.statics.initiateRTT = async (data) => {
  try {
    // Validate data using Joi schema
    validateRTTData(data);
    // Create and save the RTT document
    const initiateRTT = new RTT(data);
    // Generate a unique rttId
    initiateRTT.rttId = `RTT-${v4().slice(0, 8).toUpperCase()}`;
    initiateRTT.formPath = `${process.env.FORM_PATH}/RTT_${initiateRTT._id}`;
    initiateRTT.metadata = initiateRTT.metadata || {};
    initiateRTT.metadata.createdBy = data.jwtInfo.jwtId;
    await initiateRTT.save();

    return initiateRTT;
  } catch (error) {
    logger.error(`Failed to initiate RTT. Error: ${error.message}`);
    throw new Error(`RTT initiation failed: ${error.message}`);
  }
};

// To expose virtuals when converting document to JSON
rttSchema.set("toJSON", { virtuals: true });

const RTT = mongoose.model("RTT", rttSchema);

export default RTT;
