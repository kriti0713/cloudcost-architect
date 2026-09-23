import { Router } from "express";
import { body } from "express-validator";
import { getProjects, createProject } from "../controllers/projectController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getProjects);
router.post(
  "/",
  [
    body("userId").notEmpty().withMessage("userId is required"),
    body("name").trim().notEmpty().withMessage("Project name is required"),
  ],
  validate,
  createProject
);

export default router;