import express from "express";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { authenticate } from "../lib/auth/index.js";
import { validateAndSanitizeInput } from "../middleware/errorHandler.js";
import { Roles } from "../util/util.js";

const router = express.Router();

router.post("/login", authenticate.localLogin);
router.post("/signup", validateAndSanitizeInput, authenticate.localSignUp);
router.post(
  "/forgot-password",
  authenticate.jwt_auth([Roles.Public]),
  forgotPassword
);
router.post(
  "/reset-password",
  authenticate.jwt_auth([Roles.Public]),
  resetPassword
);

// router.get('/sso/login', azureLogin);
// router.get('/sso/callback', azureCallback);
// router.get('/logout', logout);

export default router;
