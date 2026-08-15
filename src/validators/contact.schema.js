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

  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),

  subject: z.string().trim().optional(),

  message: z
    .string({
      required_error: "Message is required",
    })
    .trim()
    .min(10, "Message must be at least 10 characters"),
});

export const updateContactUsSchema = createContactUsSchema.partial();
