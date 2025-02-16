import passport from "passport";
import localLogin from "./local-login-strategy.js";
import jwtLogin from "./jwt-login-strategy.js";
import localSignUp from "./local-signup-strategy.js";
import User from "../../models/User.js"; // Adjust path as necessary
import logger from "../../config/logger.js"; // Adjust path as necessary

// Configure Passport middleware
const configureMiddleware = function (app) {
  // Serialize user into the session
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
  });

  // Deserialize user from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Use `findById` and `await`
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Initialize strategies
  localLogin(passport); // Local login strategy
  jwtLogin(passport); // JWT strategy
  localSignUp(passport); // Local signup strategy

  // Use Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  logger.info("Auth middleware configured.");
};

// Pass through the authenticate object for route usage
const authenticate = {
  localLogin: function (req, res, next) {
    return passport.authenticate(
      "local-login",
      authenticationStrategyCallback(req, res, next)
    )(req, res, next);
  },
  localSignUp: function (req, res, next) {
    return passport.authenticate(
      "local-signup",
      localSignupCallback(req, res, next)
    )(req, res, next);
  },
  jwt_auth: (requiredRoles) => {
    return async (req, res, next) => {
      // Check for Authorization header
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return res
          .status(401)
          .json({ status: "error", message: "Authorization Token Missing" });
      }

      try {
        // Call passport.authenticate to validate the JWT
        passport.authenticate(
          "jwt",
          { session: false },
          async (err, jwtInfoRes) => {
            if (err) {
              return res.status(500).json({
                status: "error",
                message: err.message || "Internal server error",
              });
            }

            // If no JWT is found or invalid
            if (!jwtInfoRes || !jwtInfoRes.jwtInfo.permission) {
              return res
                .status(403)
                .json({ status: "error", message: "Permission not granted." });
            }

            // If the user has an "admin" role, grant access
            if (jwtInfoRes.jwtInfo.permission === "admin") {
              req.body.jwtInfo = jwtInfoRes.jwtInfo; // Store the user's JWT info in the request
              return next(); // Allow access to the next middleware
            }
            // Check user's modular permissions against required roles
            const userPermissions =
              jwtInfoRes.jwtInfo.permission.modularPermissions;
            const isPublic = requiredRoles[0] === "Public"; // Simplify the check

            // Check if user has any of the required roles in their modularPermissions
            const hasPermission = userPermissions.some((permission) =>
              requiredRoles.includes(permission)
            );

            // If user doesn't have permission and it's not public access, deny access
            if (!hasPermission && !isPublic) {
              return res
                .status(403)
                .json({ status: "error", message: "Insufficient permissions" });
            }

            // Store the user's JWT info and allow access
            req.body.jwtInfo = jwtInfoRes.jwtInfo;
            return next(); // Allow access to the next middleware
          }
        )(req, res, next); // Pass the request, response, and next to passport.authenticate
      } catch (error) {
        return res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    };
  },

  // Other authentication strategies can be added here
};

function authenticationStrategyCallback(req, res, next) {
  return (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    if (user) {
      // Update User Last Login
      User.updateLastLogin(user._id);
    }

    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      const userDetails = await User.getUserDataForApi(user);
      return res
        .status(200)
        .json({ message: "Login successful", data: userDetails });
    });
  };
}

function localSignupCallback(req, res, next) {
  return (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(409).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      let payload = {
        id: user._id,
        username: user.username,
      };
      return res
        .status(201)
        .json({ message: "User registered successfully", data: payload });
    });
  };
}

function authenticationStrategyCallbackJwt(req, res, next) {
  const apiUrl = req.originalUrl.substr(11);

  return (err, jwtInfo, info) => {
    if (err) {
      return res.send({ status: "error", message: err });
    }

    if (jwtInfo) {
      req.body.jwtInfo = jwtInfo.jwtInfo;

      // Check roles here:
      const requiredRoles = permission[apiUrl] || []; // Check for roles required for this API (using `permission` object)
      if (requiredRoles.length && !requiredRoles.includes(jwtInfo.role)) {
        return res.send({
          status: "error",
          message: "Permission not granted.",
        });
      }

      return next();
    } else {
      return res.send({ status: "error", message: "Permission not granted." });
    }
  };
}

// Export the middleware and authenticate object
export { configureMiddleware, authenticate };
