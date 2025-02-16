// Import Admin Routes
import authRoutes from "./authRoutes.js";
import userRoleRoutes from "./admin/userRoleRoutes.js";
import userRoutes from "./admin/userRoutes.js";
import questionBankRoutes from "./admin/questionBankRoutes.js";
import workFlowRoutes from "./admin/workflowRoutes.js";
import masterRoutes from "./masterRoutes.js";
import vendorRoutes from "./app/vendorRoutes.js";
import rttRoutes from "./app/rttRoutes.js";
import assessmentRoutes from "./app/assessmentRoutes.js";
import formRoutes from './app/formRoutes.js';

// Function to set up routes
export default function setupRoutes(app) {
  // Setup Common User Routes
  app.use("/user/auth", authRoutes);

  // Setup Admin User Routes
  app.use("/admin-user/role", userRoleRoutes);
  app.use("/admin-user", userRoutes);
  app.use("/admin-question-bank", questionBankRoutes);
  app.use("/admin-work-flow", workFlowRoutes);
  app.use("/masters", masterRoutes);
  app.use("/app-vendor", vendorRoutes);
  app.use("/app-rtt", rttRoutes);
  app.use("/app-assessment", assessmentRoutes);
  app.use("/app-form", formRoutes);
}
