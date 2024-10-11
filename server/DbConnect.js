import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.MONGODB_URI;

const connectDB = () => {
  try {
    const conn = mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
    return conn;
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1); 
  }
};

export default connectDB;