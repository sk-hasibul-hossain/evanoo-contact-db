import express from "express";
import {
  createContact,
  getAllContactsController,
  deleteContactController,
} from "../controllers/contact.controller.js";
import { userValidate } from "../middlewares/validate.middleware.js";
import { createContactUsSchema } from "../validators/contact.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", userValidate(createContactUsSchema), createContact);
router.get("/", authMiddleware, getAllContactsController);
router.delete("/:contactId", authMiddleware, deleteContactController);

export default router;
