import { z } from "zod";

export const createContactUsSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .trim()
    .min(2, "Full name must be at least 2 characters"),

  email: z.email({
    required_error: "Email is required",
  }),

  subject: z.string().trim().optional(),

  message: z
    .string({
      required_error: "Message is required",
    })
    .trim()
    .min(10, "Message must be at least 10 characters"),
});

export const updateContactUsSchema = createContactUsSchema.partial();
