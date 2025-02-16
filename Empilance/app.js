import express from "express";
import mongoSanitize from "express-mongo-sanitize";
//CORS
import cors from "cors";

// import passport from 'passport';
import session from "express-session";
import config from "./config/config.js";
import logger from "./config/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { configureMiddleware } from "./lib/auth/index.js";

// Import Swagger Setup
import setupSwagger from "./config/swagger.js";

// Import Application Routes
import setupRoutes from "./routes/index.js";

// Load environment variables
dotenv.config();

const app = express();

// Connect to the database
connectDB();
// Use express-mongo-sanitize to sanitize MongoDB queries
app.use(mongoSanitize());
//CORS access
app.use(cors());

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
  })
);

// Configure Passport Middleware
configureMiddleware(app);

// Setup Swagger
setupSwagger(app);

// Set up all application routes
setupRoutes(app);

app.get("/", (req, res) => res.send("TPRM backend connected successfully."));

app.use(errorHandler);

app.listen(config.port, () =>
  logger.info(`Server running on port ${config.port}`)
);
