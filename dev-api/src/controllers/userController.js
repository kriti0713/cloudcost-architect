import { store } from "../data/store.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getUsers = (req, res) => {
  res.status(200).json({ success: true, data: store.users });
};

export const getUserById = (req, res, next) => {
  const user = store.users.find((u) => u.id === req.params.id);
  if (!user) return next(new ApiError(404, "User not found"));
  res.status(200).json({ success: true, data: user });
};

export const createUser = (req, res) => {
  const { name, email, role, avatarUrl } = req.body;
  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    role: role || "Developer",
    avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
  };
  store.users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};