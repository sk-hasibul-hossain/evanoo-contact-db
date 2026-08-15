import { registerService } from "../services/user.service.js";
import User from "../models/user.model.js";

export const createDefaultUser = async () => {
  try {
    const email = process.env.DEFAULT_USER;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Default user already exists");
      return;
    }

    await registerService({
      name: "Admin",
      email,
      phone: "",
      role: "admin",
      isActive: true,
      password: process.env.DEFAULT_PASSWORD,
    });

    console.log("Default user created successfully");
  } catch (error) {
    console.error("Failed to create default user:", error);
  }
};
