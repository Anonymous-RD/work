import mongoose from "mongoose";
import MetaDataSchema from "./Metadata.js";
import logger from "../config/logger.js";

// Define the schema for static lists
const staticListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    default: "department",
  },
  priority: {
    type: Number,
    required: true,
  },
  metadata: {
    type: MetaDataSchema,
    default: () => ({}),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Static method to create a static list item
staticListSchema.statics.createVendor = async function (data) {
  try {
    const { jwtInfo, ...staticListData } = data;

    // Validate JWT info
    if (!jwtInfo || !jwtInfo.jwtId) {
      throw new Error("Invalid JWT info. 'jwtId' is required.");
    }

    // Create and save the new vendor item
    const staticListItem = new this({
      ...staticListData,
      metadata: {
        ...staticListData.metadata,
        createdBy: jwtInfo.jwtId,
      },
    });

    await staticListItem.save();
    return staticListItem;
  } catch (error) {
    // Log error details
    logger.error(`Failed to create Static List Item: ${error.message}`, {
      error,
      data,
    });
    throw new Error("Failed to create Static List Item.");
  }
};

// Ensure virtual fields are included in JSON outputs
staticListSchema.set("toJSON", { virtuals: true });

// Create and export the model
const StaticList = mongoose.model("StaticList", staticListSchema);

export default StaticList;
