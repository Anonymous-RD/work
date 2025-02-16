import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import userRoleController from "../../controllers/admin/userRoleController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";
const router = express.Router();

//Routes for user roles
router.post(
  "/create",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  userRoleController.createRole
);
router.put(
  "/update",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  userRoleController.updateRole
);
router.put(
  "/delete",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  userRoleController.deleteRole
);
router.get(
  "/list",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  userRoleController.getAllRoles
);
router.get(
  "/:roleId",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  userRoleController.getRoleById
);

export default router;
