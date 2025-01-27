import mongoose from "mongoose";
// import Vehicle from "@/models/Vehicle";

//! it's good to use dotenv, when i was using scripts, without dotenv, they weren't working
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  // `strictQuery` ensures no new fields other than defined in the model are allowed
  mongoose.set("strictQuery", true);

  // Check Mongoose connection state
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB is already connected 😍😍😍😍😍😍😍😍😍😍");
  } else {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      });

      console.log("MongoDB connected 😍😍😍😍😍😍😍😍😍😍");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1); // Exit process with failure code
    }
  }

  //? Fetch and log data from the database
  // try {
  //   const data = await Vehicle.find({}); // Use lean() for optimized read
  //   console.log("Fetched Data: 😍😍😍😍😍\n", data);
  // } catch (fetchError) {
  //   console.error("Error fetching data:", fetchError.message);
  // }
};

export default connectDB;
