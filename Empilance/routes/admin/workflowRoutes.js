import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import workFlowController from "../../controllers/admin/workFlowController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";
const router = express.Router();

//Routes for workflow
router.post(
  "/create",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.createWorkflow
);
router.put(
  "/update",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.updateWorkFlow
);
router.put(
  "/stageApproval",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.stageApproval
);
router.post(
  "/delete",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.deleteWorkFlow
);
router.get(
  "/list/:tag",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.list
);
router.get(
  "/:workflowId",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.getWorkFlowById
);
router.post(
  "/clone/:workflowId",
  authenticate.jwt_auth([Roles.Workflow]),
  validateAndSanitizeInput,
  workFlowController.cloneWorkFlow
);

export default router;
