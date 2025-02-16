import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";
import { v4 } from "uuid";

// Joi Validation Schema
const assessmentValidationSchema = Joi.object({
  vendorId: Joi.string().required().messages({
    "string.base": `"vendorId" should be a type of 'ObjectId'`,
    "any.required": `"vendorId" is a required field`,
  }),

  assessmentQuesId: Joi.string().required().messages({
    "string.base": `"assessmentQuesId" should be a type of 'ObjectId'`,
    "any.required": `"assessmentQuesId" is a required field`,
  }),

  workflowId: Joi.string().required().messages({
    "string.base": `"workflowId" should be a type of 'ObjectId'`,
    "any.required": `"workflowId" is a required field`,
  }),

  status: Joi.string()
    .valid("initiated", "in-progress", "completed")
    .default("initiated")
    .messages({
      "string.base": `"status" should be a type of 'text'`,
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

  isActive: Joi.boolean().optional().default(true).messages({
    "boolean.base": `"isActive" should be a boolean`,
  }),
});

// Mongoose Schema
const assessmentSchema = new mongoose.Schema({
  assessmentId: {
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
  assessmentQuesId: {
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
      const expireTime = new Date();
      expireTime.setDate(
        expireTime.getDate() + Number(process.env.EXPIRE_FORM_PATH_DAYS)
      );
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

// Static Method to Initiate Assessment
assessmentSchema.statics.initiateAssessment = async function (data) {
  try {
    // Validate input data using Joi schema
    const { error, value } = assessmentValidationSchema.validate(data, {
      abortEarly: false, // Collect all validation errors
    });
    if (error) {
      throw new Error(error.details.map((detail) => detail.message).join(", "));
    }

    const assessment = new this(value);
    // Generate a unique assessmentId
    assessment.assessmentId = `ASS-${v4().slice(0, 8).toUpperCase()}`;
    assessment.formPath = `${process.env.FORM_PATH}/ASSESSMENT_${assessment._id}`;
    assessment.metadata = assessment.metadata || {};
    assessment.metadata.createdBy = value.jwtInfo.jwtId;

    await assessment.save();
    return assessment;
  } catch (error) {
    logger.error(`Failed to initiate Assessment. Error: ${error.message}`);
    throw new Error("Failed to initiate Assessment.");
  }
};

assessmentSchema.set("toJSON", { virtuals: true });

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
