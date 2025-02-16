import mongoose from "mongoose";
import logger from "../../config/logger.js";
import { httpStatus, sendResponse } from "../../util/util.js";
import User from "../../models/User.js";
import QuestionBank from "../../models/QuestionBank.js";
import Vendor from "../../models/Vendor.js";
import RTT from "../../models/RTT.js";
import Assessment from "../../models/Assessment.js";

const dashboardController = {};

dashboardController.getDashboardData = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const userId = new mongoose.Types.ObjectId(jwtInfo.jwtId);

    // Fetch user data
    const user = await User.findById(userId).select(
      "-password -passwordHistory"
    );

    // Fetch question bank status
    const questionBankStatus = await QuestionBank.aggregate([
      { $match: { "metadata.createdBy": userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          drafted: { $sum: { $cond: [{ $eq: ["$isPublish", false] }, 1, 0] } },
          published: { $sum: { $cond: [{ $eq: ["$isPublish", true] }, 1, 0] } },
          archived: { $sum: { $cond: [{ $eq: ["$isActive", false] }, 1, 0] } },
        },
      },
    ]);

    // Fetch vendor status
    const vendorStatus = await Vendor.aggregate([
      { $match: { "metadata.createdBy": userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          inProcess: {
            $sum: { $cond: [{ $eq: ["$status", "in-process"] }, 1, 0] },
          },
          active: { $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] } },
          inactive: {
            $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] },
          },
          offboarded: {
            $sum: { $cond: [{ $eq: ["$status", "offboarded"] }, 1, 0] },
          },
        },
      },
    ]);

    // Fetch RTT status
    const rttStatus = await RTT.aggregate([
      { $match: { "metadata.createdBy": userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          initiated: {
            $sum: { $cond: [{ $eq: ["$status", "initiated"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
          },
          completed: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isActive", false] },
                    { $eq: ["$status", "completed"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    // Fetch Assessment status
    const assessmentStatus = await Assessment.aggregate([
      { $match: { "metadata.createdBy": userId } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          initiated: {
            $sum: { $cond: [{ $eq: ["$status", "initiated"] }, 1, 0] },
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0] },
          },
          completed: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$isActive", false] },
                    { $eq: ["$status", "completed"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    const dashboardData = {
      user,
      questionBankStatus: questionBankStatus[0] || {
        total: 0,
        drafted: 0,
        published: 0,
        archived: 0,
      },
      vendorStatus: vendorStatus[0] || {
        total: 0,
        inProcess: 0,
        active: 0,
        inactive: 0,
        offboarded: 0,
      },
      rttStatus: rttStatus[0] || {
        total: 0,
        initiated: 0,
        inProgress: 0,
        completed: 0,
      },
      assessmentStatus: assessmentStatus[0] || {
        total: 0,
        initiated: 0,
        inProgress: 0,
        completed: 0,
      },
    };

    logger.info(`Dashboard data retrieved for user ${jwtInfo.jwtId}`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Dashboard data retrieved successfully",
      dashboardData
    );
  } catch (error) {
    logger.error(
      `Error occurred while fetching dashboard data: ${error.message}`
    );
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

export default dashboardController;
