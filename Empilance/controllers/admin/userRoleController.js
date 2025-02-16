import Roles from "../../models/Roles.js";
import logger from "../../config/logger.js";
import isValid from "../../util.js";
import mongoose from "mongoose";
import { httpStatus, sendResponse } from "../../util/util.js";

const userRoleController = {};

const checkId = async (id) => {
  const validId = await Roles.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
  ]);

  if (!isValid(id) || validId.length === 0) return true;
  else return false;
};

//User can create a role
userRoleController.createRole = async (req, res) => {
  try {
    const roleData = req.body;
    const createdBy = req.body.jwtInfo.jwtId;

    if (!roleData.name || !roleData.desc || !roleData.department) {
      logger.error("Role name, description and department is required.");
      return sendResponse(
        res,
        httpStatus.BAD_REQUEST,
        "Role name, description and department is required."
      );
    }

    logger.info(`Creating role ${roleData.name} for admin id ${createdBy}`);
    //Creates the role
    const saveRole = await Roles.createRole(roleData, createdBy);

    logger.info(
      `Role ${roleData.name} created successfully with id ${saveRole._id}`
    );
    return sendResponse(
      res,
      httpStatus.CREATED,
      `Role created successfully.`,
      saveRole
    );
  } catch (error) {
    logger.error(`Error occured while creating role: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//User can update a role
userRoleController.updateRole = async (req, res) => {
  try {
    const roleData = req.body;

    const { id } = req.body; //'id' is the id of the role to be updated

    const updatedBy = req.body.jwtInfo.jwtId;

    //Checks if the id is valid
    if (!roleData.id || (await checkId(roleData.id))) {
      logger.error(`Invalid role ${id}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, `Invalid role id.`);
    }

    delete roleData.id;

    //Updates role
    const roleUpdated = await Roles.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $set: {
          name: { $ifNull: [roleData.name, "$name"] },
          desc: { $ifNull: [roleData.desc, "$desc"] },
          modularPermission: {
            $ifNull: [
              {
                $setUnion: [
                  "$modularPermission",
                  { $ifNull: [roleData.modularPermission, []] },
                ],
              },
              "$modularPermission",
            ],
          },
          functionalPermissionToAdd: {
            $ifNull: [
              {
                $setUnion: [
                  "$functionalPermissionToAdd",
                  { $ifNull: [roleData.functionalPermissionToAdd, []] },
                ],
              },
              "$functionalPermissionToAdd",
            ],
          },
          functionalPermissionToUpdate: {
            $ifNull: [
              {
                $setUnion: [
                  "$functionalPermissionToUpdate",
                  { $ifNull: [roleData.functionalPermissionToUpdate, []] },
                ],
              },
              "$functionalPermissionToUpdate",
            ],
          },
          functionalPermissionToDelete: {
            $ifNull: [
              {
                $setUnion: [
                  "$functionalPermissionToDelete",
                  { $ifNull: [roleData.functionalPermissionToDelete, []] },
                ],
              },
              "$functionalPermissionToDelete",
            ],
          },
          otherFunctionalPermission: {
            $ifNull: [
              {
                $setUnion: [
                  "$otherFunctionalPermission",
                  { $ifNull: [roleData.otherFunctionalPermission, []] },
                ],
              },
              "$otherFunctionalPermission",
            ],
          },
          "metadata.updatedBy": updatedBy,
          "metadata.updatedAt": new Date(),
        },
      },
      {
        $merge: {
          into: "roles",
          on: "_id",
          whenMatched: "merge",
          whenNotMatched: "discard",
        },
      },
    ]);

    logger.info(`Role id ${id} updating.`);

    //Gets the updated role
    const updatedRole = await Roles.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          metadata: 0,
        },
      },
    ]);

    const updatedRolesWithVirtuals = updatedRole.map((role) => {
      return new Roles(role).toObject({ virtuals: true });
    });

    logger.info(`Role ${id} updated.`);
    return sendResponse(
      res,
      httpStatus.ACCEPTED,
      `Role updated.`,
      updatedRolesWithVirtuals
    );
  } catch (error) {
    logger.error(`Error occured while updating role ${id} : ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//User can delete a role
userRoleController.deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    const updatedBy = req.body.jwtInfo.jwtId;

    //Checks if the id is valid
    if (!id || (await checkId(id))) {
      logger.error(`Invalid role ${id}`);
      return sendResponse(res, httpStatus.BAD_REQUEST, `Invalid role id.`);
    }

    logger.info(`Deleting role ${id}.`);
    const user = await Roles.findByIdAndUpdate(id, {
      isActive: false,
      "metadata.updatedBy": updatedBy,
      "metadata.updatedAt": new Date(),
    });

    //Checks if the users with role are active or not
    if (user.length === 0) {
      logger.error(`Users with role ${id} are active.`);
      return sendResponse(
        res,
        httpStatus.NO_CONTENT,
        `Users with role id are active.`
      );
    }

    //Deletes the role
    const roleDeleted = await Roles.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $set: {
          isActive: false,
          "metadata.updatedBy": updatedBy,
          "metadata.updatedAt": new Date(),
        },
      },
    ]);

    logger.info(`Role deleted : ${roleDeleted}`);
    return sendResponse(res, httpStatus.OK, "Role deleted");
  } catch (error) {
    logger.error(`Error occured while deleting role ${id} :${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//Lists out all the role
userRoleController.getAllRoles = async (req, res) => {
  try {
    const { jwtInfo } = req.body;
    const { page = 1, limit = process.env.Page_Limit, name,isActive } = req.query;
    const skip = (page - 1) * limit;

    // Build the match condition
    const matchCondition = {
      "metadata.createdBy": new mongoose.Types.ObjectId(jwtInfo.jwtId),
      isActive: isActive === "false" ? false : true,
    };
    if (name) {
      matchCondition.name = { $regex: name, $options: "i" };
    }

    // Count the total number of matching active roles
    const totalItems = await Roles.countDocuments(matchCondition);

    // Fetch paginated roles
    const roles = await Roles.aggregate([
      { $match: matchCondition },
      { $skip: skip },
      { $limit: parseInt(limit) },
    ]);

    const response = {
      roles,
      totalItems,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };

    logger.info(`All roles listed on page ${page}.`);
    return sendResponse(res, httpStatus.OK, "All roles listed.", response);
  } catch (error) {
    logger.error(`Getting all roles failed: ${error.message}`);
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

//List out individual role details
userRoleController.getRoleById = async (req, res) => {
  try {
    logger.info(
      `Start fetching individual role details for id :: ${req.params.roleId}`
    );

    const role = await Roles.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.roleId),
          isActive: true,
        },
      },
    ]);

    logger.info(`Fetching details of ${req.params.roleId}`);

    if (role.length === 0) {
      logger.error("No roles found");
      return sendResponse(
        res,
        httpStatus.NOT_FOUND,
        `No roles found or role is inactive.`
      );
    }

    logger.info(
      `Role details fetched successfully for id :: ${req.params.roleId}`
    );
    return sendResponse(
      res,
      httpStatus.OK,
      `Role details fetched successfully.`,
      role
    );
  } catch (error) {
    logger.error(
      `Problem while fetching role details for id :: ${req.params.roleId} and ${error.message}`
    );
    return sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};

export default userRoleController;
