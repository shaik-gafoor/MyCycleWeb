const express = require("express");
const router = express.Router();
const {
  getAllCycles,
  getCycleById,
  createCycle,
  updateCycle,
  deleteCycle,
} = require("../controllers/cycleController");

// Middleware to log all requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log("Route params:", req.params);
  console.log("Query params:", req.query);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", req.body);
  }
  next();
});

// GET /api/cycles - Get all cycles
router.get("/", getAllCycles);

// GET /api/cycles/:id - Get a single cycle by ID
router.get("/:id", getCycleById);

// POST /api/cycles - Create a new cycle
router.post("/", createCycle);

// Test route to verify PUT is working (MUST be before the main PUT route)
router.put("/test/:id", (req, res) => {
  res.json({
    message: "PUT route is working",
    id: req.params.id,
    body: req.body,
  });
});

// PUT /api/cycles/:id - Update a cycle by ID
router.put("/:id", updateCycle);

// DELETE /api/cycles/:id - Delete a cycle by ID
router.delete("/:id", deleteCycle);

module.exports = router;
