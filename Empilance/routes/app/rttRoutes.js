import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import rttController from "../../controllers/app/rttController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";

const router = express.Router();

// Routes for RTT
router.post(
  "/initiate",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  rttController.initiateRTT
);
router.get(
  "/list",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  rttController.getAllRTTs
);
router.get(
  "/status",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  rttController.rttStatus
);
export default router;
