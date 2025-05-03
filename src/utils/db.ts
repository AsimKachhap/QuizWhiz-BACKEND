import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_URI || ""
    );
    console.log("CONNECTED to MONGO DB SUCCESSFULLY");
  } catch (error) {
    console.log("MONGO DB Connection FAILED !!!", error);
    process.exit(1);
  }
};

export default connectDB;
