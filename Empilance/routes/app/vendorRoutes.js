import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import vendorController from "../../controllers/app/vendorController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";

const router = express.Router();

// Routes for Vendor Management
router.post(
  "/create",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.createVendor
);
router.put(
  "/update",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.updateVendor
);
router.put(
  "/delete",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.deleteVendor
);
router.get(
  "/list",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.getAllVendors
);
router.get(
  "/status",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.getStatus
);
router.get(
  "/:vendorId",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  vendorController.getVendorById
);


export default router;
