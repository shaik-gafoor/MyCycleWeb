const Cycle = require("../models/Cycle");

// Validation helper function
const validateCycleData = (data) => {
  const errors = [];

  if (!data.imageUrl || typeof data.imageUrl !== "string") {
    errors.push("imageUrl is required and must be a string");
  }

  if (!data.title || typeof data.title !== "string") {
    errors.push("title is required and must be a string");
  }

  if (!data.description || typeof data.description !== "string") {
    errors.push("description is required and must be a string");
  }

  if (!data.cost || typeof data.cost !== "number" || data.cost <= 0) {
    errors.push("cost is required and must be a positive number");
  }

  return errors;
};

// Get All Cycles
const getAllCycles = async (req, res) => {
  try {
    const cycles = await Cycle.find().select("-__v -createdAt -updatedAt");
    // Map _id to id for each cycle
    const formattedCycles = cycles.map((cycle) => ({
      id: cycle._id,
      imageUrl: cycle.imageUrl,
      title: cycle.title,
      description: cycle.description,
      cost: cycle.cost,
    }));
    res.status(200).json(formattedCycles);
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

    // Create new cycle
    const newCycle = new Cycle({
      imageUrl,
      title,
      description,
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

    // Validate input data
    const validationErrors = validateCycleData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Update cycle in MongoDB
    const updatedCycle = await Cycle.findByIdAndUpdate(
      id,
      {
        imageUrl,
        title,
        description,
        cost: Number(cost),
      },
      { new: true, runValidators: true }
    );

    if (!updatedCycle) {
      return res.status(404).json({
        success: false,
        message: "Cycle not found",
      });
    }

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
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update cycle",
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
