const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    cost: {
      type: Number,
      required: [true, "Cost is required"],
      min: [0, "Cost must be a positive number"],
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields
  }
);

const Cycle = mongoose.model("Cycle", cycleSchema);

module.exports = Cycle;
