import mongoose from "mongoose";
import logger from "../../config/logger.js";
import { httpStatus, sendResponse } from "../../util/util.js";
import RTT from "../../models/RTT.js";
import User from "../../models/User.js";

const rttController = {};

// Initiate RTT

rttController.initiateRTT = async (req, res) => {
  try {
    const { vendorId, rttQuesId, workflowId, jwtInfo } = req.body;
    if (!vendorId || !rttQuesId || !workflowId) {
      let missingField = "";
      if (!vendorId) missingField = "vendorId";
      else if (!rttQuesId) missingField = "rttQuesId";
      else if (!workflowId) missingField = "workflowId";
      logger.info(`${missingField} is required`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `${missingField} is required`
      );
    }

    logger.info(`Initiate RTT for user ${jwtInfo?.jwtId}.`);
    const savedRTT = await RTT.initiateRTT(req.body);

    logger.info(`RTT with id ${savedRTT._id} initiated successfully.`);

    return sendResponse(
      res,
      httpStatus.CREATED,
      "RTT initiated successfully",
      savedRTT
    );
  } catch (error) {
    console.log("error", error);
    logger.error(`Error occurred while initiating RTT: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get All RTT
rttController.getAllRTTs = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const { page = 1, limit = process.env.Page_Limit, name } = req.query;
    const skip = (page - 1) * limit;
    const jwtId = new mongoose.Types.ObjectId(jwtInfo.jwtId);
    const matchConditions = {
      "metadata.createdBy": jwtId,
    };

    // Build the aggregation pipeline
    const pipeline = [
      {
        $match: matchConditions,
      },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      {
        $unwind: "$vendorDetails",
      },
      // Apply name filter if provided
      ...(name
        ? [
            {
              $match: { "vendorDetails.name": { $regex: name, $options: "i" } },
            },
          ]
        : []),
      {
        $project: {
          _id: 1,
          vendorId: 1,
          rttId: 1,
          status: 1,
          formPath: 1,
          isActive: 1,
          initiatedDate: 1,
          "vendorDetails.name": 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(limit),
      },
    ];

    // Execute the aggregation pipeline
    const RTTData = await RTT.aggregate(pipeline);

    // Count total items with the same filtering conditions
    const totalItems = await RTT.aggregate([
      { $match: matchConditions },
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      { $unwind: "$vendorDetails" },
      ...(name
        ? [
            {
              $match: { "vendorDetails.name": { $regex: name, $options: "i" } },
            },
          ]
        : []),
      { $count: "total" },
    ]);

    const response = {
      RTTData,
      totalItems: totalItems[0]?.total || 0,
      currentPage: Number(page),
      limit: Number(limit),
    };

    logger.info(`RTT List retrieved for page ${page}.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "RTT List retrieved successfully",
      response
    );
  } catch (error) {
    logger.error(`Error occurred while fetching RTT List: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

rttController.rttStatus = async (req, res) => {
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
    const initiatedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
      status: "initiated",
    };

    const inProgressCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
      status: "in-progress",
    };

    const completedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: false,
      status: "completed",
    };

    const totalCount = await RTT.countDocuments(totalCountCondition);
    const initiatedCount = await RTT.countDocuments(initiatedCountCondition);
    const inProgressCount = await RTT.countDocuments(inProgressCountCondition);
    const completedCount = await RTT.countDocuments(completedCountCondition);

    logger.info(`RTT Status for user ${jwtInfo.jwtId}`);
    return sendResponse(res, httpStatus.OK, "RTT Status", {
      totalCount,
      initiatedCount,
      inProgressCount,
      completedCount,
    });
  } catch (error) {
    logger.error(`RTT Status of the user failed: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};
export default rttController;
