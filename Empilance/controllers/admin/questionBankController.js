import QuestionBank from "../../models/QuestionBank.js";
import logger from "../../config/logger.js";
import isValid from "../../util.js";
import mongoose from "mongoose";
import WorkFlow from "../../models/WorkFlow.js";
import { httpStatus, sendResponse } from "../../util/util.js";
import User from "../../models/User.js";

const questionBankController = {};

const checkId = async (id) => {
  const validId = await QuestionBank.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);

  if (!isValid(id) || validId.length === 0) return true;
  else return false;
};

//Create question bank
questionBankController.createQuestionBank = async (req, res) => {
  try {
    const validId = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.body.jwtInfo.jwtId) } },
    ]);
    //Checks if id is valid
    if (validId.length === 0) {
      logger.warn("No user found");
      return sendResponse(res, httpStatus.NO_CONTENT, "No user found");
    }

    const questionBank = req.body;

    //Checks if question name and list is present
    if (!questionBank.questionBankName || !questionBank.questionList) {
      logger.error(`Questionbank name or question list missing.`);
      return sendResponse(
        res,
        httpStatus.NO_CONTENT,
        "Filename or questions missing."
      );
    }

    logger.info(`Creating questionbank for ${req.body.jwtInfo.jwtId}.`);

    //Creates the workflow
    const newQuestionBank = await QuestionBank.createQuestionBank(
      questionBank,
      req.body.jwtInfo.jwtId
    );

    logger.info(
      `Questionbank created successfully ${newQuestionBank._id} for ${req.body.jwtInfo.jwtId}.`
    );
    return sendResponse(
      res,
      httpStatus.CREATED,
      `Questionbank created.`,
      newQuestionBank
    );
  } catch (error) {
    logger.error(`Failed to create Questionbank. Error :${error.message}.`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Update question bank
questionBankController.updateQuestionBank = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedBy = req.body.jwtInfo.jwtId;

    //Checks for valid id
    if (await checkId(id)) {
      logger.error("Valid id required.");
      return sendResponse(res, httpStatus.BAD_REQUEST, "Valid id required.");
    }

    const questionBankData = req.body;
    questionBankData["metadata.updatedBy"] = updatedBy;
    questionBankData["metadata.updatedAt"] = new Date();

    delete questionBankData.id;

    logger.info(`Updating questionbank ${id}.`);

    let updatedQuestionBank = await QuestionBank.findByIdAndUpdate(
      id,
      questionBankData,
      { new: true }
    );

    logger.info(`Questionbank ${id} updated.`);
    return sendResponse(
      res,
      httpStatus.ACCEPTED,
      `Questionbank published.`,
      updatedQuestionBank
    );
  } catch (error) {
    logger.error(`Question bank update failed : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Delete question bank
questionBankController.deleteQuestionBank = async (req, res) => {
  try {
    const { id } = req.body;

    //Checks if the id is valid
    if (await checkId(id)) {
      logger.error("Valid questionbank id is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Valid questionbank id is required ."
      );
    }

    logger.info(`Deleting questionbank ${id}.`);
    //Updates isActive as false
    const [questionbankDeleted] = await QuestionBank.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "workflows",
          localField: "_id",
          foreignField: "questionBankId",
          as: "workflowData",
        },
      },
      { $set: { isActive: false } },
      {
        $merge: {
          into: "questionbanks",
          on: "_id",
          whenMatched: "merge",
          whenNotMatched: "discard",
        },
      },
    ]);

    //Updates questionbank workflow isActive as false
    if (questionbankDeleted) {
      await WorkFlow.updateOne(
        { _id: new mongoose.Types.ObjectId(questionbankDeleted.workflow) },
        { $set: { isActive: false } }
      );
    }

    logger.info(`Questionbank ${id} deleted.`);
    return sendResponse(res, httpStatus.ACCEPTED, "Questionbank deleted");
  } catch (error) {
    logger.error(`Question bank update failed : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Admin question bank list
questionBankController.listQuestionBank = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const {
      page = 1,
      limit = process.env.Page_Limit,
      questionBankName,
      isActive,
    } = req.query;

    const skip = (page - 1) * limit;

    // Check if the provided user ID is valid
    const validId = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(jwtInfo.jwtId) } },
    ]);

    if (validId.length === 0) {
      logger.error("Valid id is required.");
      return sendResponse(res, httpStatus.BAD_REQUEST, "Valid id is required.");
    }

    // Build match conditions for filtering
    const matchConditions = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: isActive === "false" ? false : true,
      ...(["RTT", "ASSESSMENT"].includes(req.params.tag) && {
        tag: req.params.tag,
      }),
    };

    // Add questionBankName filter if provided
    if (questionBankName) {
      matchConditions.questionBankName = {
        $regex: questionBankName,
        $options: "i",
      };
    }

    // Aggregation with lookup to fetch currentStage label
    const questionBankData = await QuestionBank.aggregate([
      { $match: matchConditions },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $lookup: {
          from: "workflows",
          localField: "workFlowId",
          foreignField: "_id",
          as: "workflowData",
        },
      },
      {
        $addFields: {
          currentStageLabel: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $arrayElemAt: ["$workflowData.stages", 0] },
                  as: "stage",
                  cond: { $eq: ["$$stage.sno", "$currentStage"] },
                },
              },
              0,
            ],
          },
          status: {
            $cond: [
              { $eq: ["$isActive", false] },
              "archived",
              {
                $cond: [{ $eq: ["$isPublish", true] }, "published", "drafted"],
              },
            ],
          },
        },
      },
      {
        $project: {
          _id: 1,
          questionBankName: 1,
          questionList: 1,
          workFlowId: 1,
          isActive: 1,
          isPublish: 1,
          currentStage: 1,
          tag: 1,
          metadata: 1,
          history: 1,
          currentStageLabel: "$currentStageLabel.state",
          status: 1,
        },
      },
    ]);

    const totalItems = await QuestionBank.countDocuments(matchConditions);

    logger.info(`All question banks listed for user ${jwtInfo.jwtId}`);
    return sendResponse(res, httpStatus.OK, "Question Bank List Data", {
      totalItems,
      currentPage: parseInt(page),
      limit: parseInt(limit),
      data: questionBankData,
    });
  } catch (error) {
    logger.error(
      `Getting all question banks of the user failed: ${error.message}`
    );
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Admin question bank list
questionBankController.questionBankStatus = async (req, res) => {
  try {
    const { jwtInfo } = req.body;

    // Check if the provided user ID is valid
    const validId = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(jwtInfo.jwtId) } },
    ]);

    if (validId.length === 0) {
      logger.error("Valid id is required.");
      return sendResponse(res, httpStatus.BAD_REQUEST, "Valid id is required.");
    }

    // Build match conditions for filtering
    const totalCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
    };
    const draftedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
      isPublish: false,
    };

    const publishedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
      isPublish: true,
    };

    const archivedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: false,
    };

    const totalCount = await QuestionBank.countDocuments(totalCountCondition);
    const draftedCount = await QuestionBank.countDocuments(
      draftedCountCondition
    );
    const publishedCount = await QuestionBank.countDocuments(
      publishedCountCondition
    );
    const archivedCount = await QuestionBank.countDocuments(
      archivedCountCondition
    );

    logger.info(`Question Bank Status for user ${jwtInfo.jwtId}`);
    return sendResponse(res, httpStatus.OK, "Question Bank Status", {
      totalCount,
      draftedCount,
      publishedCount,
      archivedCount,
    });
  } catch (error) {
    logger.error(`Question Bank Status of the user failed: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Get question bank by ID
questionBankController.getQuestionBankById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("test", id);
    // Checks if the provided ID is valid
    if (await checkId(id)) {
      logger.error("Valid question bank ID is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Valid question bank ID is required."
      );
    }

    // Fetch the question bank by ID
    const questionBankData = await QuestionBank.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), isActive: true } },
      { $project: { metadata: 0 } }, // Optionally exclude metadata if not needed
    ]);

    if (!questionBankData || questionBankData.length === 0) {
      logger.warn(`No question bank found with ID: ${id}`);
      return sendResponse(res, httpStatus.NOT_FOUND, "No question bank found.");
    }

    logger.info(`Question bank ${id} fetched successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Question bank details",
      questionBankData[0]
    );
  } catch (error) {
    logger.error(`Failed to fetch question bank by ID: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

// Clone question bank
questionBankController.cloneQuestionBank = async (req, res) => {
  try {
    const { id } = req.params;
    const clonedBy = req.body.jwtInfo.jwtId;
    const { questionBankName } = req.body;

    // Validate that questionBankName is provided
    if (!questionBankName || questionBankName.trim() === "") {
      logger.error("questionBankName is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "questionBankName is required."
      );
    }

    // Check if the provided ID is valid
    if (await checkId(id)) {
      logger.error("Valid question bank ID is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Valid question bank ID is required."
      );
    }

    // Fetch the existing question bank
    const originalQuestionBank = await QuestionBank.findOne({
      _id: new mongoose.Types.ObjectId(id),
      isActive: true,
    }).lean();

    if (!originalQuestionBank) {
      logger.warn(`No question bank found with ID: ${id}`);
      return sendResponse(res, httpStatus.NOT_FOUND, "No question bank found.");
    }

    // Prepare the cloned question bank object
    const clonedQuestionBank = {
      ...originalQuestionBank,
      questionBankName: questionBankName,
      isActive: true, // Ensure the clone is active
      metadata: {
        createdBy: clonedBy,
        createdAt: new Date(),
      },
      currentStage: 1, // Reset current stage
      history: [], // Clear history
    };

    // Remove fields that should not be cloned
    delete clonedQuestionBank._id;

    // Save the cloned question bank
    const newQuestionBank = await QuestionBank.create(clonedQuestionBank);

    logger.info(
      `Question bank cloned successfully from ${id} to ${newQuestionBank._id}.`
    );
    return sendResponse(
      res,
      httpStatus.CREATED,
      "Question bank cloned successfully.",
      newQuestionBank
    );
  } catch (error) {
    logger.error(`Failed to clone question bank: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

export default questionBankController;
