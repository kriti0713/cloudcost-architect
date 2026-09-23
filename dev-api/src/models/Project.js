import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },
    techStack: [{ type: String }],
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);