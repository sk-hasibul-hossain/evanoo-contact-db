import { getDashboardOverviewService } from "../services/dashboard.service.js";

export const getOverviewController = async (req, res) => {
  try {
    const overview = await getDashboardOverviewService(req.query);

    return res.status(201).json({
      message: "Overview fetch successfully",
      data: overview,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
