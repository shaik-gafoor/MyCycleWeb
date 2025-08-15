const express = require("express");
const router = express.Router();
const {
  getAllCycles,
  getCycleById,
  createCycle,
  updateCycle,
  deleteCycle,
} = require("../controllers/cycleController");

// GET /api/cycles - Get all cycles
router.get("/", getAllCycles);

// GET /api/cycles/:id - Get a single cycle by ID
router.get("/:id", getCycleById);

// POST /api/cycles - Create a new cycle
router.post("/", createCycle);

// PUT /api/cycles/:id - Update a cycle by ID
router.put("/:id", updateCycle);

// DELETE /api/cycles/:id - Delete a cycle by ID
router.delete("/:id", deleteCycle);

module.exports = router;
