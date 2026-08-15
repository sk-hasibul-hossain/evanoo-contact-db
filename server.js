import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { createDefaultUser } from "./src/seeders/default-user.seeder.js";

// connectDB();

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running at ${PORT}`);
// });

const startServer = async () => {
  try {
    await connectDB();

    await createDefaultUser();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
