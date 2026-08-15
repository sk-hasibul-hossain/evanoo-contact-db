import express from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  loginController,
  logoutController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginController);

router.post("/logout", logoutController);

router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;
