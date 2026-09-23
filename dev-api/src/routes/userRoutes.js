import { Router } from "express";
import {
  getUsers,
  getUserById,
  getUserProfile,
  createUser,
  updateUserProfile,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);
router.get("/:id", getUserById);

export default router;