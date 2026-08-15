import express from "express";
import { userValidate } from "../middlewares/validate.middleware.js";
import { createUserSchema } from "../validators/users.schema.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getOverviewController } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/overview", authMiddleware, getOverviewController);

export default router;
