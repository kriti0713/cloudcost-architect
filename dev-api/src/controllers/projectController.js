import { Project } from "../models/Project.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new ApiError(404, "Project not found");
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) throw new ApiError(404, "Project not found");
    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new ApiError(404, "Project not found");
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};