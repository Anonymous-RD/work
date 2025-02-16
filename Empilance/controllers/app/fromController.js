import mongoose from "mongoose";
import logger from "../../config/logger.js";
import { httpStatus, sendResponse } from "../../util/util.js";
import RTT from "../../models/RTT.js";
import Assessment from "../../models/Assessment.js";
import QuestionBank from "../../models/QuestionBank.js";

const formController = {};

// Helper function to check if ID is valid
const checkId = async (collection, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false; // Ensure it's a valid ObjectID format
  const validId = await collection.exists({ _id: id });
  return Boolean(validId);
};
const submissionCounts = new Map();

formController.formSubmit = async (req, res) => {
  try {
    const { formId, jwtInfo } = req.body;
    const ip = req.ip;
    if (!formId) {
      return sendResponse(res, httpStatus.BAD_REQUEST, "formId is required.");
    }
    if (!formId.includes("_")) {
      logger.error("Invalid formId format.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Invalid formId format."
      );
    }

    const [formType, id] = formId.split("_");

    // Track submission count per IP
    const ipSubmissionCount = submissionCounts.get(ip) || 0;

    if (ipSubmissionCount >= process.env.FORM_SUBMISSION_LIMIT) {
      logger.error(`IP ${ip} has reached submission limit.`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "You have reached the submission limit."
      );
    }

    let doc = null;
    if (formType === "RTT") {
      if (!(await checkId(RTT, id))) {
        logger.error(`Invalid Form ID: ${id}`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form ID is invalid.");
      }
      doc = await RTT.findById(id);
      if (doc.expireAt && new Date() > new Date(doc.expireAt)) {
        logger.error(`Form ID: ${id} has expired.`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form has expired.");
      }
    } else if (formType === "ASSESSMENT") {
      if (!(await checkId(Assessment, id))) {
        logger.error(`Invalid Form ID: ${id}`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form ID is invalid.");
      }
      doc = await Assessment.findById(id);
      if (doc.expireAt && new Date() > new Date(doc.expireAt)) {
        logger.error(`Form ID: ${id} has expired.`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form has expired.");
      }
    } else {
      logger.error(`Invalid form type: ${formType}`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `Invalid form type: ${formType}`
      );
    }

    // Increment IP submission count
    submissionCounts.set(ip, ipSubmissionCount + 1);

    logger.info(`Form submitted by user: ${jwtInfo?.jwtId}.`);
    return sendResponse(
      res,
      httpStatus.CREATED,
      "Form submitted successfully.",
      { submissionCount: submissionCounts.get(ip) }
    );
  } catch (error) {
    logger.error(`Error occurred while Form submitted: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get form path details
formController.formDetails = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId || !formId.includes("_")) {
      logger.error("Invalid formId format.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Invalid formId format."
      );
    }

    const [formType, id] = formId.split("_");
    let details = null;

    if (formType === "RTT") {
      if (!(await checkId(RTT, id))) {
        logger.error(`Invalid Form ID: ${id}`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form ID is invalid.");
      }
      const doc = await RTT.findOne({ _id: id, isActive: true });
      details = await QuestionBank.findById(doc.rttQuesId);
    } else if (formType === "ASSESSMENT") {
      if (!(await checkId(Assessment, id))) {
        logger.error(`Invalid Form ID: ${id}`);
        return sendResponse(res, httpStatus.BAD_REQUEST, "Form ID is invalid.");
      }
      const doc = await Assessment.findOne({
        _id: id,
        isActive: true,
      });
      details = await QuestionBank.findById(doc.assessmentQuesId);
    } else {
      logger.error(`Invalid form type: ${formType}`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `Invalid form type: ${formType}`
      );
    }

    if (!details) {
      logger.error(`No details found for Form ID: ${id}`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Form details not found.");
    }
    logger.info(`Form details for ${id} retrieved successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Form details retrieved successfully.",
      details
    );
  } catch (error) {
    logger.error(
      `Error occurred while fetching form details (${req.params.formId}): ${error.message}`
    );
    return sendResponse(res, httpStatus.SERVER_ERROR, "Internal server error.");
  }
};

export default formController;
