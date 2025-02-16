import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import userController from "../../controllers/admin/userController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";
const router = express.Router();

//Routes for user
router.post(
  "/create",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.createUser
);
router.put(
  "/update",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.updateUser
);
router.put(
  "/delete",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.deleteUser
);
router.get(
  "/list",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.getAllUser
);
router.get(
  "/:userId",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.getUserById
);
router.post(
  "/resendEmail/:userId",
  authenticate.jwt_auth([Roles.User_Management]),
  validateAndSanitizeInput,
  userController.reSendEmailByUserId
);

export default router;
