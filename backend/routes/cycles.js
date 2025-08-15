const express = require("express");
const router = express.Router();
const {
  getAllCycles,
  createCycle,
  updateCycle,
  deleteCycle,
} = require("../controllers/cycleController");

// GET /api/cycles - Get all cycles
router.get("/", getAllCycles);

// POST /api/cycles - Create a new cycle
router.post("/", createCycle);

// PUT /api/cycles/:id - Update a cycle by ID
router.put("/:id", updateCycle);

// DELETE /api/cycles/:id - Delete a cycle by ID
router.delete("/:id", deleteCycle);

module.exports = router;
