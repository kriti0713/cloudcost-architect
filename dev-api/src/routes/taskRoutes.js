import { Router } from "express";
import { body } from "express-validator";
import { getTasks, createTask, updateTaskStatus, deleteTask } from "../controllers/taskController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getTasks);
router.post(
  "/",
  [
    body("projectId").notEmpty().withMessage("projectId is required"),
    body("title").trim().notEmpty().withMessage("Task title is required"),
    body("dueDate").isISO8601().withMessage("Valid due date (YYYY-MM-DD) is required"),
  ],
  validate,
  createTask
);
router.patch(
  "/:id/status",
  [
    body("status")
      .isIn(["todo", "in-progress", "completed"])
      .withMessage("Status must be todo, in-progress, or completed"),
  ],
  validate,
  updateTaskStatus
);
router.delete("/:id", deleteTask);

export default router;