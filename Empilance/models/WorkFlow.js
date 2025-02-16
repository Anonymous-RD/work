import mongoose from "mongoose";
import Joi from "joi";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";

// Joi Validation Schema
const workflowValidationSchema = Joi.object({
  name: Joi.string().required().trim().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "any.required": `"name" is a required field`,
  }),

  stages: Joi.array()
    .required()
    .items(
      Joi.object({
        sno: Joi.number().required().messages({
          "number.base": `"sno" should be a number`,
          "any.required": `"sno" is a required field`,
        }),
        state: Joi.string().required().trim().messages({
          "string.base": `"state" should be a type of 'text'`,
          "any.required": `"state" is a required field`,
        }),
        actions: Joi.array().required().items(Joi.string().trim()).messages({
          "array.base": `"actions" should be an array of strings`,
          "any.required": `"actions" is a required field`,
        }),
        nextState: Joi.string().required().trim().messages({
          "string.base": `"nextState" should be a type of 'text'`,
          "any.required": `"nextState" is a required field`,
        }),
        userAllowed: Joi.array().required().items(Joi.string()).messages({
          "array.base": `"userAllowed" should be an array of ObjectIds (user references)`,
          "any.required": `"userAllowed" is a required field`,
        }),
      })
    )
    .messages({
      "array.base": `"stages" should be an array of stage objects`,
      "any.required": `"stages" is a required field`,
    }),

  tag: Joi.string().valid("RTT", "ASSESSMENT").required().messages({
    "string.base": `"tag" should be a type of 'text'`,
    "any.required": `"tag" is a required field`,
    "any.only": `"tag" must be either 'RTT' or 'ASSESSMENT'`,
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
const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stages: [
    {
      sno: { type: Number, required: true }, // Stage number for ordering
      state: { type: String, required: true }, // Current state name
      actions: [{ type: String, required: true }], // List of actions (e.g., review, check, approve)
      nextState: { type: String, required: true }, // State to transition to after successful action
      userAllowed: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      ], // User allowed to perform actions
    },
  ],
  tag: { type: String, required: true, enum: ["RTT", "ASSESSMENT"] },
  metadata: {
    type: MetaDataSchema,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Create Workflow method with validation
workflowSchema.statics.createWorkFlow = async (data, createdBy) => {
  try {
    // Validate data using Joi schema
    const { error } = workflowValidationSchema.validate(data);
    if (error) {
      // Throw validation error with specific message
      error.details.forEach((detail) => {
        throw new Error(detail.message);
      });
    }

    const createWorkFlow = new WorkFlow(data);
    createWorkFlow.metadata = createWorkFlow.metadata || {};
    createWorkFlow.metadata.createdBy = createdBy;
    await createWorkFlow.save();

    return createWorkFlow;
  } catch (error) {
    console.log("error", error);
    logger.info(`Failed to create workflow. Error : ${error.message}`);
    throw new Error(error.message);
  }
};

workflowSchema.virtual("lastApprovedStage").get(function () {
  let lastApprovedStage = null;
  this.stages.forEach((stage) => {
    if (stage.actions.includes("approve")) {
      if (!lastApprovedStage || stage.sno > lastApprovedStage) {
        lastApprovedStage = stage.sno;
      }
    }
  });

  return lastApprovedStage;
});

workflowSchema.set("toJSON", { virtuals: true });

const WorkFlow = mongoose.model("WorkFlow", workflowSchema);

export default WorkFlow;
