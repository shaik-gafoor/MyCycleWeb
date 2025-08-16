const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const cycleRoutes = require("./routes/cycles");

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Debug middleware - Log all requests
app.use((req, res, next) => {
  console.log("\n=== INCOMING REQUEST ===");
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:", req.body);
  }
  console.log("========================\n");
  next();
});

// Routes
app.use("/api/cycles", cycleRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "MyCycleWeb Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal Server Error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Cycles API: http://localhost:${PORT}/api/cycles`);
});

module.exports = app;
