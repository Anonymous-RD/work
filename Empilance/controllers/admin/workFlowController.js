import WorkFlow from "../../models/WorkFlow.js";
import User from "../../models/User.js";
import logger from "../../config/logger.js";
import QuestionBank from "../../models/QuestionBank.js";
import mongoose, { mongo } from "mongoose";
import { httpStatus, sendResponse } from "../../util/util.js";
import isValid from "../../util.js";

const workflowController = {};

const checkId = async (id) => {
  const validId = await WorkFlow.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);

  if (!isValid(id) || validId.length === 0) return true;
  else return false;
};

const checkAllowedUser = async (stages) => {
  let invalidUsers = [];
  await Promise.all(
    stages.flatMap((stage) =>
      stage.userAllowed.map(async (user) => {
        const validId = await User.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(user) } },
        ]);

        if (validId.length === 0) {
          invalidUsers.push(user);
        }
      })
    )
  );
  return invalidUsers;
};

//Create workflow
workflowController.createWorkflow = async (req, res) => {
  try {
    const createdBy = req.body.jwtInfo.jwtId;

    //Checks if all the allowed users are valid
    const invalidUsers = await checkAllowedUser(req.body.stages);

    if (invalidUsers.length > 0) {
      logger.error(`User ${invalidUsers} is invalid.`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `User ${invalidUsers} is invalid.`
      );
    }

    logger.info("Creating workflow.");
    //Creates workflow
    const workFlow = await WorkFlow.createWorkFlow(req.body, createdBy);

    logger.info(`Workflow created successfully with id: ${workFlow._id}.`);
    return sendResponse(
      res,
      httpStatus.CREATED,
      `Workflow created successfully`,
      workFlow
    );
  } catch (error) {
    console.log("error", error);
    logger.error(`Workflow creation failed : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Update workflow
workflowController.updateWorkFlow = async (req, res) => {
  try {
    const { id, index, stages } = req.body;
    const updatedBy = req.body.jwtInfo.jwtId;
    //Finds if the workflow is present
    if (await checkId(id)) {
      logger.error(`Workflow ${id} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    //Checks if all the allowed users are valid
    const invalidUsers = await checkAllowedUser(req.body.stages);

    if (invalidUsers.length > 0) {
      logger.error(`User ${invalidUsers} is invalid.`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `User ${invalidUsers} is invalid.`
      );
    }

    logger.info(`Updating an index of workflow ${id}.`);
    // Update the specific stage in the workflow(if index is present in the req.body)
    if (index != undefined) {
      const result = await WorkFlow.updateOne(
        { _id: id, "stages.sno": index },
        {
          $set: {
            "stages.$": stages,
            "metadata.updatedBy": updatedBy,
            "metadata.updatedAt": new Date(),
          },
        }
      );

      if (result.modifiedCount > 0) {
        const workFlowData = await WorkFlow.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(id) } },
        ]);
        delete workFlowData.id;

        logger.info(`Questionbank ${id},index ${index} updated Successfully.`);
        return sendResponse(res, httpStatus.ACCEPTED, workFlowData);
      } else {
        logger.error(`No changes made or stage index not found for ${id}.`);
        return sendResponse(
          res,
          httpStatus.BAD_REQUEST,
          "No changes made or stage index not found"
        );
      }
    } else {
      //Updates the whole workflow (if index is not present in the req.body)
      try {
        let data = req.body;

        logger.info(`Updating the workflow ${id}.`);

        const [workflow] = await WorkFlow.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(id) } },
          {
            $set: {
              name: { $ifNull: [data.name, "$name"] },
              stages: { $ifNull: [data.stages, "$stages"] },
              tag: { $ifNull: [data.tag, "$tag"] },
              "metadata.updatedBy": updatedBy,
              "metadata.updatedAt": new Date(),
            },
          },
        ]);
        const result = await WorkFlow.updateOne(
          { _id: new mongoose.Types.ObjectId(id) },
          {
            $set: {
              name: workflow.name,
              stages: workflow.stages,
              "metadata.updatedBy": workflow.metadata.updatedBy,
              "metadata.updatedAt": workflow.metadata.updatedAt,
            },
          }
        );

        logger.info(`Workflow ${id} updated.`);
        return sendResponse(
          res,
          httpStatus.ACCEPTED,
          `Workflow ${id} updated.`,
          workflow
        );
      } catch (error) {
        logger.error(
          `Error occured while updating workflow : ${error.message}`
        );
        return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
      }
    }
  } catch (error) {
    logger.error(`Error occured while updating workflow : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Stage approval in workflow
workflowController.stageApproval = async (req, res) => {
  try {
    const { id, index, action, jwtInfo } = req.body;
    const updatedBy = jwtInfo.jwtId;

    // Validate if workflow exists
    const workFlowData = await WorkFlow.findById(id);
    if (!workFlowData) {
      logger.error(`Workflow not found: ${id}`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    // Find the required stage
    const stage = workFlowData.stages.find((stage) => stage.sno === index);
    if (!stage) {
      logger.error(`Stage not found: ${index} in workflow ${id}`);
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        `Stage ${index} not found`
      );
    }

    // Prepare the stage update object
    const stageUpdate = {
      stage: stage.state,
      action,
      approvedBy: updatedBy,
      approvedAt: new Date(),
    };

    // Update the question bank history and set the current state
    let updatedQuestionBank = await QuestionBank.findOneAndUpdate(
      { workFlowId: new mongoose.Types.ObjectId(id) },
      {
        $push: { history: stageUpdate },
      },
      { new: true } // Returns the updated document
    ).lean();

    if (!updatedQuestionBank) {
      logger.error(`QuestionBank not found for workflow ID: ${id}`);
      return sendResponse(res, httpStatus.NOT_FOUND, "QuestionBank not found");
    }

    // Find the current stage object
    const currentStageObj = workFlowData.stages.find(
      (stage) => stage.sno === updatedQuestionBank.currentStage
    );

    if (!currentStageObj || !currentStageObj.userAllowed?.length) {
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "No users to verify in the current stage"
      );
    }

    // Check if all users in userAllowed are present in the history
    const allUsersVerified = currentStageObj.userAllowed.every((userId) =>
      updatedQuestionBank.history.some(
        (historyItem) =>
          historyItem.approvedBy?.toString() === userId?.toString()&&historyItem.stage===currentStageObj.state
      )
    );
 
    // If all users are verified, move to the next state
    if (allUsersVerified) {
      const nextState = currentStageObj.nextState;
      const nextStateObj = workFlowData.stages.find(
        (stage) => stage.state === nextState
      );

      if (nextStateObj) {
        updatedQuestionBank = await QuestionBank.findOneAndUpdate(
          { workFlowId: new mongoose.Types.ObjectId(id) },
          {
            $set: { currentStage: nextStateObj.sno }, // Update to the next stage's sno
          },
          { new: true }
        ).lean();
      } else {
        logger.error(`Next state ${nextState} not found in workflow ${id}`);
        return sendResponse(
          res,
          httpStatus.OK,
          `Next stage: ${nextState} not found`
        );
      }
    }

    logger.info(`Workflow ${id}, stage ${index} updated successfully`);
    return sendResponse(
      res,
      httpStatus.ACCEPTED,
      `Stage ${index} updated successfully`,
      updatedQuestionBank // Return the updated document
    );
  } catch (error) {
    logger.error(`Error updating workflow: ${error.message}`);
    return sendResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      "Internal Server Error"
    );
  }
};

//Delete in workflow
workflowController.deleteWorkFlow = async (req, res) => {
  try {
    const { id } = req.body;

    const updatedBy = req.body.jwtInfo.jwtId;

    if (await checkId(id)) {
      logger.error(`Workflow ${id} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    //Checks if the workflow questionbank is active or not
    const questionbank = await QuestionBank.aggregate([
      {
        $match: {
          "metadata.createdBy": new mongoose.Types.ObjectId(
            req.body.jwtInfo.jwtId
          ),
          isActive: true,
        },
      },
    ]);

    if (questionbank.length > 0) {
      logger.error(`Questionbank is active, cannot delete workflow ${id}.`);
      return sendResponse(
        res,
        httpStatus.SERVER_ERROR,
        "Questionbank is active, cannot delete workflow."
      );
    }

    logger.info(`Deleting questionbank ${id}.`);

    //Deleted workflow
    const result = await WorkFlow.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          isActive: false,
          "metadata.updatedBy": updatedBy,
          "metadata.updatedAt": new Date(),
        },
      }
    );

    if (!result) {
      logger.error(`Workflow not found ${id}.`);
      return sendResponse(res, httpStatus.NO_CONTENT, "Workflow not found");
    }

    logger.info(`Deleted Successfully ${id}.`);
    return sendResponse(res, httpStatus.OK, "Deleted Successfully");
  } catch (error) {
    logger.error(`Error occured while deleting workflow : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Get all workflows
workflowController.list = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const tag = req.params.tag;
    const search = req.query.search;

    // Parse page and limit from query parameters, set default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || process.env.Page_Limit;
    const skip = (page - 1) * limit;

    // Base match conditions
    const matchConditions = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
      ...(["RTT", "ASSESSMENT"].includes(tag) && { tag: tag }),
      ...(search && { name: { $regex: search, $options: "i" } }), // Case-insensitive search on name
    };

    // Aggregate pipeline with pagination
    const result = await WorkFlow.aggregate([
      { $match: matchConditions },
      { $skip: skip },
      { $limit: limit },
    ]);

    // Count total items for pagination metadata
    const totalItems = await WorkFlow.countDocuments(matchConditions);

    logger.info("List of all workflows.");

    // Response with pagination metadata
    return sendResponse(res, httpStatus.ACCEPTED, "List of all workflows.", {
      workflows: result,
      totalItems,
      currentPage: page,
      limit,
    });
  } catch (error) {
    logger.error(`Error occurred while fetching workflows: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Get workflow by id
workflowController.getWorkFlowById = async (req, res) => {
  try {
    //Finds workflow by id
    const result = await WorkFlow.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.workflowId) } },
    ]);

    if (!result || result.length === 0) {
      logger.error(`Workflow ${req.params.workflowId} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    logger.info(
      `Fetched workflow details successfully for id ${req.params.workflowId}.`
    );
    return sendResponse(
      res,
      httpStatus.OK,
      `Workflow details fetched successfully.`,
      result[0]
    );
  } catch (error) {
    logger.error(
      `There is an error occurred while fetching workflow details for id ${req.params.workflowId} : ${error.message}`
    );
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

workflowController.cloneWorkFlow = async (req, res) => {
  try {
    const { workflowId } = req.params;
    const createdBy = req.body.jwtInfo.jwtId;
    const { name } = req.body;

    // Validate that the name is provided
    if (!name || name.trim() === "") {
      logger.error("name is required.");
      return sendResponse(res, httpStatus.BAD_REQUEST, "name is required.");
    }

    // Validate workflow ID
    if (await checkId(workflowId)) {
      logger.error(`Workflow ${workflowId} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    // Retrieve the workflow to clone
    const workflowToClone = await WorkFlow.findById(workflowId);

    if (!workflowToClone) {
      logger.error(`Workflow ${workflowId} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Workflow not found");
    }

    // Clone the workflow
    const clonedWorkFlow = {
      ...workflowToClone.toObject(), // Copy the workflow object
      name: name,
      "metadata.createdBy": createdBy, // Update metadata
      "metadata.createdAt": new Date(),
      "metadata.updatedBy": createdBy,
      "metadata.updatedAt": new Date(),
    };
    delete clonedWorkFlow._id;

    // Save the cloned workflow
    const newWorkflow = await WorkFlow.create(clonedWorkFlow);

    logger.info(
      `Workflow ${workflowId} cloned successfully as ${newWorkflow._id}.`
    );
    return sendResponse(
      res,
      httpStatus.CREATED,
      "Workflow cloned successfully",
      newWorkflow
    );
  } catch (error) {
    logger.error(`Error occurred while cloning workflow: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

export default workflowController;
