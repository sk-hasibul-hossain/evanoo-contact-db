import { app } from "./src/app.js";
import connectDB from "./src/config/db.js";

let isConnected = false;

async function handler(req, res) {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export default handler;
