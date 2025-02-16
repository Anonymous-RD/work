import logger from "../config/logger.js";
import { httpStatus, Roles, sendResponse } from "../util/util.js";
import StaticList from "../models/StaticList.js";
import isValid from "../util.js";

const masterController = {};
// Helper function to check if ID is valid
const checkId = async (id) => {
  if (!isValid(id)) return true;
  const validId = await StaticList.exists({ _id: id });
  return !validId;
};
const modularPermissions = [
  { id: 1, label: "Role Management", key: Roles.Role_Management},
  { id: 2, label: "User Management", key: Roles.User_Management },
  { id: 3, label: "Question Bank", key: Roles.Question_Bank },
  { id: 4, label: "Workflow", key: Roles.Workflow },
];

// Modular Permissions List
masterController.modularPermissions = async (req, res) => {
  try {
    return sendResponse(
      res,
      httpStatus.ACCEPTED,
      "Modular Permissions List.",
      modularPermissions
    );
  } catch (error) {
    logger.error(`Error retrieving modular permissions: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

// Create Static List Item
masterController.createStaticList = async (req, res) => {
  try {
    const { name, priority, jwtInfo } = req.body;

    if (!name || !priority) {
      const missingField = !name ? "Static List name" : "Static List priority";
      logger.info(`${missingField} is required`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        `${missingField} is required`
      );
    }

    logger.info(`Creating Static List Item By ${jwtInfo?.jwtId}.`);
    const savedItem = await StaticList.create(req.body);
    logger.info(`Static List Item ${savedItem.name} created successfully.`);

    return sendResponse(
      res,
      httpStatus.CREATED,
      "Static List Item created successfully.",
      savedItem
    );
  } catch (error) {
    logger.error(`Error creating static list item: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Update Static List Item
masterController.updateStaticList = async (req, res) => {
  try {
    const { id, jwtInfo, ...updateData } = req.body;

    if (await checkId(id)) {
      logger.error(`Invalid static list item ID: ${id}`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Static list item ID is invalid"
      );
    }

    logger.info(`Updating static list item ${id} by user ${jwtInfo?.jwtId}.`);
    const updatedItem = await StaticList.findByIdAndUpdate(
      id,
      { ...updateData, "metadata.updatedBy": jwtInfo?.jwtId },
      { new: true }
    );

    logger.info(`Static list item ${id} updated successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Static list item updated successfully.",
      updatedItem
    );
  } catch (error) {
    logger.error(`Error updating static list item: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Delete Static List Item
masterController.deleteStaticList = async (req, res) => {
  try {
    const { id } = req.body;

    if (await checkId(id)) {
      logger.error(`Invalid static list item ID: ${id}`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Static list item ID is invalid"
      );
    }

    await StaticList.findByIdAndUpdate(id, { isActive: false }, { new: true });
    logger.info(`Static list item ${id} marked as inactive.`);

    return sendResponse(
      res,
      httpStatus.OK,
      "Static list item deleted successfully."
    );
  } catch (error) {
    logger.error(`Error deleting static list item: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get All Static List Items
masterController.getAllStaticList = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const { name } = req.query;
    const matchConditions = {
      "metadata.createdBy": jwtInfo?.jwtId,
      isActive: true,
    };

    if (name) matchConditions.name = { $regex: name, $options: "i" };

    const totalItems = await StaticList.countDocuments(matchConditions);
    const list = await StaticList.find(matchConditions);

    if (!list.length) {
      logger.warn("No items found.");
      return sendResponse(res, httpStatus.NO_CONTENT, "No items found.");
    }

    const response = { list, totalItems };
    logger.info("Static list retrieved successfully.");

    return sendResponse(
      res,
      httpStatus.OK,
      "Static list retrieved successfully.",
      response
    );
  } catch (error) {
    logger.error(`Error fetching static list: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

// Get Static List Item by ID
masterController.getStaticListById = async (req, res) => {
  try {
    const { id } = req.params;

    if (await checkId(id)) {
      logger.error(`Invalid static item ID: ${id}`);
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Static item ID is invalid."
      );
    }

    const item = await StaticList.findOne({ _id: id, isActive: true });

    if (!item) {
      logger.warn(`Static item ${id} not found.`);
      return sendResponse(res, httpStatus.NOT_FOUND, "Static item not found.");
    }

    logger.info(`Static item ${id} retrieved successfully.`);
    return sendResponse(
      res,
      httpStatus.OK,
      "Static list item retrieved successfully.",
      item
    );
  } catch (error) {
    logger.error(`Error fetching static item: ${error.message}`);
    return sendResponse(res, httpStatus.SERVER_ERROR, error.message);
  }
};

export default masterController;
