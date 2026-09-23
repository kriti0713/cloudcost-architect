import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Enable CORS for frontend integration
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Task 3 API running on http://localhost:5000`);
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CloudCost Architect API is running',
  });
});