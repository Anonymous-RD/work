import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import assessmentController from "../../controllers/app/assessmentController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";

const router = express.Router();

// Routes for Assessment
router.post(
  "/initiate",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  assessmentController.initiateAssessment
);
router.get(
  "/list",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  assessmentController.getAllAssessments
);
router.get(
  "/status",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  assessmentController.assessmentStatus
);
export default router;
