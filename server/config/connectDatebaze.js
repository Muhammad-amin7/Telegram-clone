import mongoose from "mongoose";

export const connectDB = async () => {
      try {
            await mongoose.connect(process.env.MANGO_URI)
            console.log("✅ MongoDB successfully connected");
      } catch (error) {
            console.log("❌ MongoDB connection error:", error.message);
      }
}