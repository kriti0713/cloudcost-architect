import { store } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getProjects = (req, res) => {
  const projectsWithStats = store.projects.map((project) => {
    const projectTasks = store.tasks.filter((t) => t.projectId === project.id);
    const completedTasks = projectTasks.filter((t) => t.status === "completed").length;
    const totalTasks = projectTasks.length;
    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return { ...project, totalTasks, completedTasks, progress };
  });

  res.status(200).json({ success: true, data: projectsWithStats });
};

export const createProject = (req, res, next) => {
  const { userId, name, description, techStack } = req.body;
  const userExists = store.users.some((u) => u.id === userId);
  if (!userExists) return next(new ApiError(404, "Associated User ID not found"));

  const newProject = {
    id: `p${Date.now()}`,
    userId,
    name,
    description: description || "",
    techStack: techStack || [],
  };
  store.projects.push(newProject);
  res.status(201).json({ success: true, data: newProject });
};