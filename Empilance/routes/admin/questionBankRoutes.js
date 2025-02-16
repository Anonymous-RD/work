import express from "express";
import { authenticate } from "../../lib/auth/index.js";
import questionBankController from "../../controllers/admin/questionBankController.js";
import { validateAndSanitizeInput } from "../../middleware/errorHandler.js";
import { Roles } from "../../util/util.js";
const router = express.Router();

//Routes for questionbank
router.post(
  "/create",
  authenticate.jwt_auth([Roles.Question_Bank]),
  // validateAndSanitizeInput,
  questionBankController.createQuestionBank
);
router.put(
  "/update",
  authenticate.jwt_auth([Roles.Question_Bank]),
  // validateAndSanitizeInput,
  questionBankController.updateQuestionBank
);
router.put(
  "/delete",
  authenticate.jwt_auth([Roles.Question_Bank]),
  validateAndSanitizeInput,
  questionBankController.deleteQuestionBank
);
router.get(
  "/list/:tag",
  authenticate.jwt_auth([Roles.Question_Bank]),
  validateAndSanitizeInput,
  questionBankController.listQuestionBank
);
router.get(
  "/status",
  authenticate.jwt_auth([Roles.Question_Bank]),
  validateAndSanitizeInput,
  questionBankController.questionBankStatus
);
router.get(
  "/:id",
  authenticate.jwt_auth([Roles.Question_Bank]),
  validateAndSanitizeInput,
  questionBankController.getQuestionBankById
);
router.post(
  "/clone/:id",
  authenticate.jwt_auth([Roles.Question_Bank]),
  validateAndSanitizeInput,
  questionBankController.cloneQuestionBank
);

export default router;
