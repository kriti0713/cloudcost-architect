import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler, ApiError } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Users, Projects & Tasks REST API",
    endpoints: {
      health: "/health",
      users: "/api/users",
      projects: "/api/projects",
      tasks: "/api/tasks",
    },
  });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// 404 Route Handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Centralized Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Task 2 REST API running on http://localhost:${PORT}`);
});