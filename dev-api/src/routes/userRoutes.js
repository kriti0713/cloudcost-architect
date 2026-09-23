import { Router } from "express";
import { body } from "express-validator";
import { getUsers, getUserById, createUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  validate,
  createUser
);

export default router;