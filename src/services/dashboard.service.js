import User from "../models/user.model.js";
import ContactUs from "../models/contact.model.js";

export const getDashboardOverviewService = async () => {
  // Start and end of today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    totalMessages,
    newMessagesToday,
    todayContacts,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      isActive: true,
    }),

    User.countDocuments({
      isActive: false,
    }),

    ContactUs.countDocuments(),

    ContactUs.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    // Fetches full contact records with all schema fields (fullName, email, phone, message, subject, createdAt, updatedAt, etc.)
    ContactUs.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
    },

    messages: {
      total: totalMessages,
      today: newMessagesToday,
    },

    contacts: todayContacts,
  };
};
