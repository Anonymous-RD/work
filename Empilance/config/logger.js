import winston from 'winston';

// Define custom colors for logging levels
const customColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Create a new logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.colorize(), // Add colorization
    winston.format.timestamp(), // Add timestamp
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // Console transport
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // Error log file
    new winston.transports.File({ filename: 'logs/combined.log' }), // Combined log file
  ],
});

// Add custom colors to the logger
winston.addColors(customColors);

export default logger;
