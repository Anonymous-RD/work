import mongoose from "mongoose";
import User from "../../models/User.js";
import logger from "../../config/logger.js";

const permissionController = {};

permissionController.fetchUserRoles = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    logger.error(`Invalid User ID format ${id}`);
    return "Invalid User ID format";
  }

  try {
    const userRole = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "roles",
          localField: "roleId",
          foreignField: "_id",
          as: "roleDetails",
        },
      },
      {
        $project: {
          userType: "$userType",
          modularPermissions: { $ifNull: ["$roleDetails.modularPermission", [[]]] },
          functionalPermissions: {
            $reduce: {
              input: {
                $concatArrays: [
                  { $ifNull: ["$roleDetails.functionalPermissionToAdd", [[]]] },
                  { $ifNull: ["$roleDetails.functionalPermissionToUpdate", [[]]] },
                  { $ifNull: ["$roleDetails.functionalPermissionToDelete", [[]]] },
                  { $ifNull: ["$roleDetails.otherFunctionalPermission", [[]]] },
                ],
              },
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $project: {
          userType: 1,
          modularPermissions: { $arrayElemAt: ["$modularPermissions", 0] }, // Flatten modularPermissions array
          functionalPermissions: 1,
        },
      },
    ]);
    return userRole;
  } catch (error) {
    logger.error(`Error fetching user roles: ${error.message}`);
    return "An error occurred while fetching user roles";
  }
};

export default permissionController;
