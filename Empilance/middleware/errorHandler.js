import logger from "../config/logger.js";
import validator from "validator";
import xss from "xss";
import mongoose from "mongoose";
import { httpStatus, sendResponse } from "../util/util.js";

// Malicious patterns for different attack types
const maliciousPatterns = {
  xss: [
    /<\s*[^>]*>/gi, // Match any HTML tag
    /javascript:/gi, // Match javascript: in href/src attributes
    /eval\s*\(/gi, // Match eval() function
    /<script.*?>.*?<\/script>/gi, // Match <script> tags with content
    /<iframe.*?>.*?<\/iframe>/gi, // Match <iframe> tags with content
    /on\w+\s*=\s*['"]?[^'"]*['"]?/gi, // Inline event handlers (onclick, onmouseover, etc.)
    /&#[xX]?[0-9a-fA-F]+;/gi, // Match encoded HTML entities
    /<\s*style.*?>.*?<\s*\/\s*style\s*>/gi, // Match <style> tags with content
    /<\s*img.*?src\s*=\s*['"]?javascript:/gi, // JavaScript in <img> src
    /<\s*(a|button|form).*?\s+href\s*=\s*['"]?\s*javascript:/gi, // <a>, <button>, and <form> tags with javascript: URLs
    /<\s*object.*?\s*data\s*=\s*['"]?javascript:/gi, // <object> tag with javascript
    /<\s*frame.*?\s*src\s*=\s*['"]?javascript:/gi, // <frame> tags with javascript
    /<\s*embed.*?\s*src\s*=\s*['"]?javascript:/gi, // <embed> tags with javascript
    /<\s*meta.*?\s*http-equiv\s*=\s*['"]?refresh['"]?/gi, // Meta refresh tag (potential for redirect)
  ],
  mongodb: [
    /\$[a-zA-Z0-9_]+/g, // MongoDB operators like $gt, $lt, etc.
  ],
  sqlInjection: [
    /(['";])+--/g, // SQL comment
    /(SELECT|INSERT|DELETE|DROP|UPDATE|CREATE|ALTER|EXEC|UNION|EXECUTE|TRUNCATE|REPLACE|MERGE|GRANT|REVOKE)/gi, // SQL keywords
    /\bUNION\b.*?\bSELECT\b/gi, // UNION SELECT queries
    /\b(CONCAT|CHAR)\s*\(/gi, // Concatenation functions
    /(\b(OR|AND)\b\s*['"]?\d+['"]?\s*=\s*['"]?\d+['"]?)/gi, // Boolean-based injections
    /\/\*[\s\S]*?\*\//g, // Block comments
    /--(\s|\n|$)/g, // Inline comments
  ],
  pathTraversal: [
    /\.\.\//g, // Path traversal sequences
    /%2e%2e%2f/gi, // Encoded traversal sequences
    /\/etc\/passwd/gi, // Unix system files
    /([a-zA-Z]:\\|\/)[^\/\\]*\.\.[\/\\]/g, // Windows traversal
  ],
  commandInjection: [
    /(;|&&|\|\|)\s*[\w]+/g, // Shell operators
    /\$\(.*?\)/g, // Subshell execution
    /`.*?`/g, // Backticks
    /\b(exec|system|passthru|shell_exec|popen|proc_open|eval)\b/gi, // Dangerous functions
  ],
  rfi: [
    /http(s)?:\/\/.*?\.(php|jsp|asp|aspx|cgi)/gi, // Remote file inclusion with certain extensions
    /\b(include|require|include_once|require_once)\b.*?(http|ftp|php|jsp)/gi, // PHP inclusion functions
  ],
  general: [
    /\0/g, // Null byte
    /[\x00-\x1F\x7F]/g, // ASCII control characters
    /[\u202E\u2066-\u2069]/g, // Unicode directional controls
    /<\s*meta.*?http-equiv\s*=\s*['"]?refresh['"]?/gi, // Meta refresh tags (could be used for redirection)
  ],
};

// Precompiled regex patterns
const allPatterns = Object.values(maliciousPatterns).flat();
const precompiledPatterns = allPatterns.map(
  (pattern) => new RegExp(pattern.source, pattern.flags)
);

// Error handling middleware
export default (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something went wrong!");
};

// Function to detect and sanitize malicious patterns iteratively
const detectAndSanitize = (data) => {
  const stack = [{ data, parentKey: "", type: "root" }];
  const sanitizedData = {};

  while (stack.length > 0) {
    const { data: currentData, parentKey, type } = stack.pop();

    if (typeof currentData === "string") {
      if (precompiledPatterns.some((pattern) => pattern.test(currentData))) {
        logger.warn(`Malicious content detected in field: ${parentKey}`);
        return { error: `Malicious content detected in field: ${parentKey}` };
      }
      sanitizedData[parentKey] = validator.escape(xss(currentData));
    } else if (Array.isArray(currentData)) {
      currentData.forEach((item, index) => {
        stack.push({
          data: item,
          parentKey: `${parentKey}[${index}]`,
          type: "array",
        });
      });
    } else if (typeof currentData === "object" && currentData !== null) {
      for (const key in currentData) {
        if (
          key.includes("Id") &&
          !mongoose.isValidObjectId(currentData[key])
        ) {
          logger.warn(
            `Malicious content detected in field: ${parentKey}.${key}`
          );
          return {
            error: `Invalid MongoDB ObjectId for field: ${parentKey}.${key}`,
          };
        }
        stack.push({
          data: currentData[key],
          parentKey: `${parentKey ? `${parentKey}.` : ""}${key}`,
          type: "object",
        });
      }
    } else {
      sanitizedData[parentKey] = currentData;
    }
  }

  return sanitizedData;
};

// Middleware for MongoDB query sanitization and validation
export const validateAndSanitizeInput = (req, res, next) => {
  try {
    const bodyResult = detectAndSanitize(req.body || {});
    const queryResult = detectAndSanitize(req.query || {});

    if (bodyResult.error) {
      sendResponse(res, httpStatus.BAD_REQUEST, bodyResult.error);
      return;
    }

    if (queryResult.error) {
      sendResponse(res, httpStatus.BAD_REQUEST, queryResult.error);
      return;
    }

    console.log("Validation and sanitization completed.");
    next();
  } catch (error) {
    logger.error(`Input validation failed: ${error.message} at ${error.stack}`);
    sendResponse(res, httpStatus.BAD_REQUEST, error.message);
  }
};
