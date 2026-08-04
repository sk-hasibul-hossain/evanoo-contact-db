import express from "express";
import contactUsRouter from "./contactUs.router.js";

const router = express.Router();
const app = express();

router.use("/contact", contactUsRouter);

export default router;
