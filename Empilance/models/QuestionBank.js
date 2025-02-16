import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";

// Joi Validation Schema
const questionBankValidationSchema = Joi.object({
  questionBankName: Joi.string().required().trim().messages({
    "string.base": `"questionBankName" should be a type of 'text'`,
    "string.empty": `"questionBankName" cannot be an empty field`,
    "any.required": `"questionBankName" is a required field`,
  }),

  questionList: Joi.array().required().items(Joi.object()).messages({
    "array.base": `"questionList" should be an array of objects`,
    "any.required": `"questionList" is a required field`,
  }),

  workFlowId: Joi.string().optional().messages({
    "string.base": `"workFlowId" should be a type of 'string'`,
  }),

  isActive: Joi.boolean().optional().default(true).messages({
    "boolean.base": `"isActive" should be a boolean`,
  }),

  isPublish: Joi.boolean().optional().default(false).messages({
    "boolean.base": `"isPublish" should be a boolean`,
  }),

  metadata: Joi.object().default({}).messages({
    "object.base": `"metadata" should be an object`,
  }),
  jwtInfo: Joi.object().required().messages({
    "object.base": `"jwtInfo" must be an object`,
    "any.required": `"jwtInfo" is required`,
  }),
  currentStage: Joi.number().optional().default(1).messages({
    "number.base": `"currentStage" should be a number`,
  }),

  history: Joi.array()
    .optional()
    .items(
      Joi.object({
        stage: Joi.string().optional(),
        action: Joi.string().optional(),
        approvedBy: Joi.string().optional(),
        approvedAt: Joi.date().optional(),
      })
    )
    .messages({
      "array.base": `"history" should be an array of objects`,
    }),

  tag: Joi.string().valid("RTT", "ASSESSMENT").required().messages({
    "string.base": `"tag" should be a type of 'text'`,
    "any.required": `"tag" is a required field`,
    "any.only": `"tag" must be either 'RTT' or 'ASSESSMENT'`,
  }),
});

// Mongoose Schema
const questionBankSchema = new mongoose.Schema({
  questionBankName: {
    type: String,
    required: true,
  },
  questionList: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  workFlowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkFlow",
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPublish: {
    type: Boolean,
    default: false,
  },
  metadata: {
    type: MetaDataSchema,
    default: () => ({}),
  },
  currentStage: {
    type: Number,
    required: false,
    default: 1,
  },
  history: [
    {
      stage: { type: String },
      action: { type: String },
      approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      approvedAt: { type: Date },
    },
  ],
  tag: {
    type: String,
    required: true,
    enum: ["RTT", "ASSESSMENT"],
  },
});

// Create QuestionBank method with validation
questionBankSchema.statics.createQuestionBank = async (data, createdBy) => {
  try {
    // Validate data using Joi schema
    const { error } = questionBankValidationSchema.validate(data);
    if (error) {
      // Throw validation error with specific message
      error.details.forEach((detail) => {
        throw new Error(detail.message);
      });
    }

    const newQuestionBank = new QuestionBank(data);

    newQuestionBank.metadata = newQuestionBank.metadata || {};
    newQuestionBank.metadata.createdBy = createdBy;
    newQuestionBank.metadata.createdAt = new Date();

    await newQuestionBank.save();

    return newQuestionBank;
  } catch (error) {
    logger.info(`Failed to create QuestionBank. Error: ${error.message}`);
    throw new Error(error.message);
  }
};

// Create the QuestionBank model
const QuestionBank = mongoose.model("QuestionBank", questionBankSchema);

export default QuestionBank;
