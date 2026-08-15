import {
  getUsersService,
  registerService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";

export const registerController = async (req, res) => {
  try {
    const user = await registerService(req.body);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsersService(req.query);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const user = await updateUserService(req.params.userId, req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const result = await deleteUserService(req.params.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
