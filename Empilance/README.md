# TPRM Backend

This project is for building a Node.js application using Express.js, MongoDB, Passport.js for local authentication, and Azure Active Directory (Azure AD) for single sign-on (SSO). The application features user creation via local authentication and SSO, with robust logging using Winston and log rotation.

## Features

- Local authentication using `passport-local` strategy
- Single Sign-On (SSO) with Azure Active Directory using `@azure/msal-node`
- MongoDB integration with Mongoose for data storage
- Proper logging with Winston and daily log rotation
- ES module support for modern JavaScript syntax
- Centralized error handling

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 recommended)
- [MongoDB](https://www.mongodb.com/)
- [Azure Active Directory](https://portal.azure.com/) account for configuring SSO

## Installation

1. **Clone the repository:**
   1. git clone https://github.com/yourusername/myapp.git
   2. cd tprm_backend
    
2. **Install dependencies:**
   1. npm install

3. **Set up environment variables:**
   1. Create a .env file in the root directory.
   2. For the default env variables you can reference from the file env.example.
   3. Make sure to configure JWT Private and Public key.
   
4. **Start the application:**
   1. npm run dev for devlopment
   2. npm run start for prod

## TPRM Backend Folder Structure

tprm_backend/
├── config/
│   ├── config.js                 # Configuration settings
│   ├── db.js                     # MongoDB connection setup
│   ├── logger.js                 # Winston logger configuration
│   ├── msalConfig.js             # MSAL configuration for Azure AD
│   └── swagger.js                # Swagger documentation configuration
├── controllers/
│   └── authController.js         # Authentication-related controllers
├── lib/
│   └── auth/
│       ├── index.js                   # Handle all strategy
│       ├── jwt-login-strategy.js      # JWT strategy
│       └── local-login-strategy.js    # Local Login strategy
│       └── local-signup-strategy.js   # Local Signup strategy
├── middleware/
│   └── errorHandler.js           # Centralized error handler middleware
├── models/
│   ├── Metadata.js               # Metadata model for MongoDB
│   └── User.js                   # User model for MongoDB
├── routes/
│   ├── authRoutes.js             # Authentication routes
│   ├── swaggerRoutes.js          # Swagger routes
│   └── userRoutes.js             # User routes
├── views/
│   ├── login.ejs                 # Login page template (optional)
│   └── index.ejs                 # Home page template (optional)
├── app.js                        # Main application entry point
├── env.example                   # For Environment variables reference
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation


## Usage

1. Local Login:
   1. Make a POST request to /user/auth/login with username and password to authenticate locally.

2. Azure AD SSO Login:
   1. Navigate to /api/auth/sso/login to start the Azure AD authentication process.
   2. After logging in, the Azure AD callback will redirect to the specified route.

3. Logout:
   1. Navigate to /api/auth/logout to log out of the application.

## Logging

The project uses Winston for logging with daily log rotation. Logs are saved in the logs/ directory, and log levels can be configured in the .env file.

## Error Handling

Centralized error handling is implemented in the middleware located in middleware/errorHandler.js. All errors are logged using Winston.

## Azure AD Configuration

1. Register an app in the Azure Portal.
2. Add a redirect URI (e.g., http://localhost:5000/api/auth/sso/callback).
3. Set up the client ID, client secret, and tenant ID in the .env file.

## Converting CommonJS to ES Modules

This project uses ES modules for modern JavaScript syntax. The key changes include:

1. Using import/export syntax instead of require/module.exports.
2. Adding "type": "module" to the package.json to enable ES module support.
3. Updating file imports with .js extensions.

## Dependencies

1. express: Web framework for Node.js.
2. mongoose: MongoDB object modeling tool
3. passport: Authentication middleware for Node.js
4. passport-local: Local authentication strategy
5. @azure/msal-node: Microsoft authentication library for Azure AD
6. winston: Logging library with support for log rotation
7. dotenv: For loading environment variables