import { loginService, logoutService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    await logoutService(res);

    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
