import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://yahyaimthiyas:23CSR243@hotelcluster.cmoowok.mongodb.net/hotelDB?retryWrites=true&w=majority');
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
