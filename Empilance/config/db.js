import mongoose from 'mongoose';
import logger from './logger.js';
import config from './config.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
