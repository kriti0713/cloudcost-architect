import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { User } from "../models/User.js";
import { Project } from "../models/Project.js";
import { Task } from "../models/Task.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    // Seed User
    await User.create({
      name: "Alex Chen",
      role: "Full Stack Intern",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      tasksCompleted: 18,
      activeProjects: 4,
    });

    // Seed Projects
    await Project.insertMany([
      {
        name: "API Gateway Redesign",
        description: "Migrating REST endpoints to GraphQL with custom middleware.",
        progress: 75,
        totalTasks: 12,
        completedTasks: 9,
        techStack: ["Next.js", "TypeScript", "GraphQL"],
      },
      {
        name: "Auth Microservice",
        description: "OAuth2 and JWT integration with RBAC support.",
        progress: 40,
        totalTasks: 10,
        completedTasks: 4,
        techStack: ["Node.js", "Redis", "Docker"],
      },
    ]);

    // Seed Tasks
    await Task.insertMany([
      {
        title: "Implement JWT refresh token logic",
        category: "Backend",
        status: "in-progress",
        priority: "high",
        dueDate: "2026-09-15",
      },
      {
        title: "Design Responsive Sidebar Navigation",
        category: "Frontend",
        status: "completed",
        priority: "medium",
        dueDate: "2026-09-10",
      },
      {
        title: "Set up CI/CD pipeline in GitHub Actions",
        category: "DevOps",
        status: "todo",
        priority: "low",
        dueDate: "2026-09-20",
      },
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();