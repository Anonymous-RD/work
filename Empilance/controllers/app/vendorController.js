import mongoose from "mongoose";
import logger from "../../config/logger.js";
import isValid from "../../util.js";
import { httpStatus, sendResponse } from "../../util/util.js";
import Vendor from "../../models/Vendor.js";
import User from "../../models/User.js";
import { v4 } from "uuid";

const vendorController = {};

// Helper function to check if ID is valid
const checkId = async (id) => {
  if (!isValid(id)) return true;
  const validId = await Vendor.exists({ _id: id });
  return !validId;
};

// Create Vendor

vendorController.createVendor = async (req, res) => {
  try {
    const { jwtInfo } = req.body;

    // Generate a unique vendorId
    const vendorId = `VEND-${v4().slice(0, 8).toUpperCase()}`;

    // Combine vendorId with request body
    const vendorData = {
      ...req.body,
      vendorId,
    };
    logger.info(`Creating vendor for user ${jwtInfo?.jwtId}.`);
    const savedVendor = await Vendor.createVendor(vendorData);

    logger.info(
      `Vendor ${savedVendor.name} with ID ${savedVendor._id} and vendorId ${savedVendor.vendorId} created successfully.`
    );

    return sendResponse(
      res,
      httpStatus.CREATED,
      "Vendor created successfully",
      savedVendor
    );
  } catch (error) {
    console.log("error", error);
    logger.error(`Error occurred while creating vendor: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Update Vendor
vendorController.updateVendor = async (req, res) => {
  try {
    const { id, jwtInfo, ...updateData } = req.body;

    if (await checkId(id)) {
      logger.error(`Invalid vendor ID: ${id}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "Vendor ID is invalid");
    }

    logger.info(`Updating vendor ${id} by user ${jwtInfo?.jwtId}.`);

    const updatedVendor = await Vendor.findByIdAndUpdate(
      id,
      { ...updateData, "metadata.updatedBy": jwtInfo?.jwtId },
      { new: true }
    );

    logger.info(`Vendor ${id} updated successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Vendor updated successfully",
      updatedVendor
    );
  } catch (error) {
    logger.error(`Error occurred while updating vendor: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Delete Vendor
vendorController.deleteVendor = async (req, res) => {
  try {
    const { id } = req.body;

    if (await checkId(id)) {
      logger.error(`Invalid vendor ID: ${id}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "Vendor ID is invalid");
    }

    await Vendor.findByIdAndUpdate(id, { isActive: false }, { new: true });

    logger.info(`Vendor ${id} marked as inactive.`);
    return sendResponse(res, httpStatus.OK, "Vendor deleted successfully");
  } catch (error) {
    logger.error(`Error occurred while deleting vendor: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get All Vendors
vendorController.getAllVendors = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const {
      page = 1,
      limit = process.env.Page_Limit,
      name,
      isActive,
    } = req.query;

    const skip = (page - 1) * limit;
    const matchConditions = {
      "metadata.createdBy": jwtInfo?.jwtId,
      isActive: isActive === "false" ? false : true,
    };

    if (name) matchConditions.name = { $regex: name, $options: "i" };

    const totalItems = await Vendor.countDocuments(matchConditions);

    const vendors = await Vendor.find(matchConditions)
      .skip(skip)
      .limit(Number(limit));

    const response = {
      vendors,
      totalItems,
      currentPage: Number(page),
      limit: Number(limit),
    };

    logger.info(`Vendors retrieved for page ${page}.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Vendors retrieved successfully",
      response
    );
  } catch (error) {
    logger.error(`Error occurred while fetching vendors: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get Vendor by ID
vendorController.getVendorById = async (req, res) => {
  try {
    const { vendorId } = req.params;

    if (await checkId(vendorId)) {
      logger.error(`Invalid vendor ID: ${vendorId}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, "Vendor ID is invalid");
    }

    const vendor = await Vendor.findOne({
      _id: vendorId,
      isActive: true,
    });

    if (!vendor) {
      logger.warn(`Vendor ${vendorId} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Vendor not found");
    }

    logger.info(`Vendor ${vendorId} retrieved successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Vendor retrieved successfully",
      vendor
    );
  } catch (error) {
    logger.error(
      `Error occurred while fetching vendor ${req.params.vendorId}: ${error.message}`
    );
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

vendorController.getStatus = async (req, res) => {
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
    const totalVendorsCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: true,
    };
    const inProcessCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      status: "in-process",
    };

    const activeCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      status: "active",
    };

    const inactiveCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      status: "inactive",
    };

    const offboardedCountCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      status: "offboarded",
    };

    const totalVendors = await Vendor.countDocuments(totalVendorsCondition);
    const inProcessCount = await Vendor.countDocuments(inProcessCountCondition);
    const activeCount = await Vendor.countDocuments(activeCountCondition);
    const inactiveCount = await Vendor.countDocuments(inactiveCountCondition);
    const offboardedCount = await Vendor.countDocuments(
      offboardedCountCondition
    );

    logger.info(`Vendors Status for user ${jwtInfo.jwtId}`);
    return sendResponse(res, httpStatus.OK, "Vendors Status", {
      totalVendors,
      inProcessCount,
      activeCount,
      inactiveCount,
      offboardedCount,
    });
  } catch (error) {
    console.log('err',error)
    logger.error(`Vendors Status of the user failed: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};
export default vendorController;
