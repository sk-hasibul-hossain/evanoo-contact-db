import express from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import contactUsRouter from "./contact.router.js";
import dashboardRouter from "./dashboard.router.js";

const router = express.Router();
const app = express();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/contact", contactUsRouter);
router.use("/dashboard", dashboardRouter);

export default router;
