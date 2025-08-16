const Cycle = require("../models/Cycle");
const {
  convertGoogleDriveUrl,
  validateCycleData,
} = require("../utils/helpers");

// Get All Cycles
const getAllCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find().select("-__v -createdAt -updatedAt");

    // Convert the response to include 'id' field and process image URLs
    const processedCycles = cycles.map((cycle) => ({
      id: cycle._id,
      imageUrl: convertGoogleDriveUrl(cycle.imageUrl),
      title: cycle.title,
      description: cycle.description,
      cost: cycle.cost,
    }));

    res.status(200).json(processedCycles);
  } catch (error) {
    console.error("Error getting all cycles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cycles",
    });
  }
};

// Get Single Cycle by ID
const getCycleById = async (req, res) => {
  try {
    const { id } = req.params;
    const cycle = await Cycle.findById(id).select("-__v -createdAt -updatedAt");

    if (!cycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    // Return response with id instead of _id
    const responseData = {
      id: cycle._id,
      imageUrl: cycle.imageUrl,
      title: cycle.title,
      description: cycle.description,
      cost: cycle.cost,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error getting cycle by ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid cycle ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to retrieve cycle",
    });
  }
};

// Create Cycle
const createCycle = async (req, res) => {
  try {
    const { imageUrl, title, description, cost } = req.body;

    // Validate input data
    const validationErrors = validateCycleData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Convert Google Drive URL to direct image URL
    const processedImageUrl = convertGoogleDriveUrl(imageUrl);

    // Create new cycle
    const newCycle = new Cycle({
      imageUrl: processedImageUrl,
      title: title.trim(),
      description: description.trim(),
      cost: Number(cost),
    });

    // Save to MongoDB
    const savedCycle = await newCycle.save();

    // Return response with id instead of _id
    const responseData = {
      id: savedCycle._id,
      imageUrl: savedCycle.imageUrl,
      title: savedCycle.title,
      description: savedCycle.description,
      cost: savedCycle.cost,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating cycle:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create cycle",
    });
  }
};

// Update Cycle
const updateCycle = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, title, description, cost } = req.body;

    console.log("Full request params:", req.params);
    console.log("Update request for ID:", id);
    console.log("Update data:", { imageUrl, title, description, cost });

    // Check if ID is provided and valid
    if (!id || id === "undefined" || id === "null") {
      return res.status(400).json({
        success: false,
        message:
          "Cycle ID is required in the URL. Please use format: PUT /api/cycles/{id}",
        receivedId: id,
      });
    }

    // Check if ID is a valid MongoDB ObjectId format (24 hex characters)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid cycle ID format. Must be a valid MongoDB ObjectId (24 hex characters)",
        receivedId: id,
      });
    }

    // Validate input data
    const validationErrors = validateCycleData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Convert Google Drive URL to direct image URL
    const processedImageUrl = convertGoogleDriveUrl(imageUrl);

    // Update cycle in MongoDB
    const updatedCycle = await Cycle.findByIdAndUpdate(
      id,
      {
        imageUrl: processedImageUrl,
        title: title.trim(),
        description: description.trim(),
        cost: Number(cost),
      },
      {
        new: true,
        runValidators: true,
        select: "-__v -createdAt -updatedAt",
      }
    );

    if (!updatedCycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found with the provided ID",
        providedId: id,
      });
    }

    console.log("Successfully updated cycle:", updatedCycle);

    // Return response with id instead of _id
    const responseData = {
      id: updatedCycle._id,
      imageUrl: updatedCycle.imageUrl,
      title: updatedCycle.title,
      description: updatedCycle.description,
      cost: updatedCycle.cost,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error updating cycle:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid cycle ID format",
        error: error.message,
        receivedId: req.params.id,
      });
    }

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update cycle",
      error: error.message,
    });
  }
};

// Delete Cycle
const deleteCycle = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete cycle from MongoDB
    const deletedCycle = await Cycle.findByIdAndDelete(id);

    if (!deletedCycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting cycle:", error);
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid cycle ID format",
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete cycle",
    });
  }
};

module.exports = {
  getAllCycles,
  getCycleById,
  createCycle,
  updateCycle,
  deleteCycle,
};
