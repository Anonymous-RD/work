import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import formController from "../../controllers/app/fromController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";

const router = express.Router();

// Routes for Form
router.post(
  "/submit",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  formController.formSubmit
);
router.get(
  "/:formId",
  authenticate.jwt_auth([Roles.Public]),
  validateAndSanitizeInput,
  formController.formDetails
);
export default router;
