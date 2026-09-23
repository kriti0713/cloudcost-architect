import { User } from "../models/User.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOne();
    if (!user) throw new ApiError(404, "User profile not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new ApiError(404, "User profile not found");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};