import express from "express";
import { authenticate } from "../lib/auth/index.js";
import masterController from "../controllers/masterController.js";
import { validateAndSanitizeInput } from "../middleware/errorHandler.js";
import { Roles } from "../util/util.js";
const router = express.Router();

router.get(
  "/modularPermissions",
  authenticate.jwt_auth([Roles.Role_Management]),
  validateAndSanitizeInput,
  masterController.modularPermissions
);

// Static list routes
router.get(
  "/static-list/list",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  masterController.getAllStaticList
);
router.get(
  "/static-list/:id",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  masterController.getStaticListById
);
router.post(
  "/static-list/create",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  masterController.createStaticList
);
router.put(
  "/static-list/update",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  masterController.updateStaticList
);
router.put(
  "/static-list/delete",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  masterController.deleteStaticList
);

export default router;
