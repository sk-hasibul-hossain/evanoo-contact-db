import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "First name must be at least 2 characters"),

  email: z.email("Invalid email address"),

  phone: z.string().trim().optional(),

  password: z.string().min(6, "Password must be at least 6 characters"),

  role: z.enum(["user", "admin", "superadmin"]).optional(),

  isActive: z.boolean().optional(),
});

export const updateUserSchema = createUserSchema.partial();
