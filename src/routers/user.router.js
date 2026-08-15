import express from "express";
import { userValidate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validators/users.schema.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUsersController,
  registerController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  userValidate(createUserSchema),
  registerController,
);

router.get("/", authMiddleware, getUsersController);

router.patch("/:userId", authMiddleware, updateUserController);

router.delete("/:userId", authMiddleware, deleteUserController);

export default router;
