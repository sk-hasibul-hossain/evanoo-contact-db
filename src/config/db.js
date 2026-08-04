import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
