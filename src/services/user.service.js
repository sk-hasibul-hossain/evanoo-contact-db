import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const registerService = async (userData) => {
  const { name, email, phone, role, isActive, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    role,
    isActive,
    password: hashedPassword,
  });

  return {
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isActive: user.isActive,
  };
};

export const getUsersService = async (query) => {
  const {
    search,
    page = 1,
    limit = 10,
    orderBy = "createdAt",
    order = "desc",
  } = query;

  const allowedSortFields = ["createdAt", "updatedAt"];

  const sortField = allowedSortFields.includes(orderBy) ? orderBy : "createdAt";

  const pipeline = [];

  // Search
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      },
    });
  }

  pipeline.push(
    {
      $sort: {
        [sortField]: order === "asc" ? 1 : -1,
      },
    },
    {
      $skip: (Number(page) - 1) * Number(limit),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        password: 0, // Never return password
      },
    },
  );

  const users = await User.aggregate(pipeline);

  const total = await User.countDocuments(
    search
      ? {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { userId: { $regex: search, $options: "i" } },
            { phoneNumber: { $regex: search, $options: "i" } },
          ],
        }
      : {},
  );

  return {
    data: users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const updateUserService = async (userId, userData) => {
  const { name, email, phone, role, isActive, password } = userData;
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Check email uniqueness only when email is being changed
  if (email !== undefined && email !== user.email) {
    const existingUser = await User.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (email !== undefined) updateData.email = email;
  if (phone !== undefined) updateData.phone = phone;
  if (role !== undefined) updateData.role = role;
  if (isActive !== undefined) updateData.isActive = isActive;

  // Hash password only when password is provided
  if (password !== undefined) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    },
  );

  return {
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    role: updatedUser.role,
    isActive: updatedUser.isActive,
  };
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await User.findByIdAndDelete(userId);

  return {
    message: "User deleted successfully",
  };
};
