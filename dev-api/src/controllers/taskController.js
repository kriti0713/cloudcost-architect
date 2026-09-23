import { store } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getTasks = (req, res) => {
  const { status, search } = req.query;
  let result = [...store.tasks];

  if (status && status !== "all") {
    result = result.filter((t) => t.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }

  res.status(200).json({ success: true, count: result.length, data: result });
};

export const createTask = (req, res, next) => {
  const { projectId, title, category, priority, dueDate } = req.body;
  const projectExists = store.projects.some((p) => p.id === projectId);
  if (!projectExists) return next(new ApiError(404, "Associated Project ID not found"));

  const newTask = {
    id: `t${Date.now()}`,
    projectId,
    title,
    category: category || "General",
    status: "todo",
    priority: priority || "medium",
    dueDate,
  };
  store.tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
};

export const updateTaskStatus = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const task = store.tasks.find((t) => t.id === id);

  if (!task) return next(new ApiError(404, "Task not found"));

  task.status = status;
  res.status(200).json({ success: true, data: task });
};

export const deleteTask = (req, res, next) => {
  const { id } = req.params;
  const index = store.tasks.findIndex((t) => t.id === id);

  if (index === -1) return next(new ApiError(404, "Task not found"));

  store.tasks.splice(index, 1);
  res.status(200).json({ success: true, message: "Task deleted successfully" });
};