import express from "express";

import { createContact } from "../controllers/contact.controller.js";
import { userValidate } from "../middlewares/validate.middleware.js";
import { createContactUsSchema } from "../validators/contact.schema.js";

const router = express.Router();

router.post("/", userValidate(createContactUsSchema), createContact);

export default router;
