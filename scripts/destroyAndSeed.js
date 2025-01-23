import mongoose from "mongoose";
import connectDB from "../config/database.js"; // Use relative path
import Vehicle from "../models/Vehicle.js";   // Use relative path

const vehicles = [
  {
    name: "Honda Civic",
    type: "car",
    price: 20000,
    stock: 5,
    image: "/images/honda-civic.webp",
    slug: "honda-civic",
    description: {
      engineCapacity: 1800,
      mileage: 30,
      fuelTank: 50,
    },
  },
  {
    name: "Yamaha R15",
    type: "bike",
    price: 1500,
    stock: 10,
    image: "/images/yamaha-r15.jpg",
    slug: "yamaha-r15",
    description: {
      engineCapacity: 150,
      mileage: 45,
      fuelTank: 12,
    },
  },
  {
    name: "Ford Mustang",
    type: "car",
    price: 45000,
    stock: 2,
    image: "/images/ford-mustang.jpg",
    slug: "ford-mustang",
    description: {
      engineCapacity: 5000,
      mileage: 15,
      fuelTank: 60,
    },
  },
  {
    name: "Ducati Panigale",
    type: "bike",
    price: 20000,
    stock: 3,
    image: "/images/ducati-panigale.jpg",
    slug: "ducati-panigale",
    description: {
      engineCapacity: 1100,
      mileage: 20,
      fuelTank: 17,
    },
  },
  {
    name: "Toyota Corolla",
    type: "car",
    price: 18000,
    stock: 8,
    image: "/images/toyota-corolla.jpg",
    slug: "toyota-corolla",
    description: {
      engineCapacity: 1600,
      mileage: 35,
      fuelTank: 45,
    },
  },
  {
    name: "Suzuki Hayabusa",
    type: "bike",
    price: 14000,
    stock: 4,
    image: "/images/suzuki-hayabusa.jpg",
    slug: "suzuki-hayabusa",
    description: {
      engineCapacity: 1340,
      mileage: 18,
      fuelTank: 21,
    },
  },
];

const destroyAndSeed = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Delete all existing vehicles
    await Vehicle.deleteMany();
    console.log("All vehicles have been removed.");

    // Insert new vehicle data
    await Vehicle.insertMany(vehicles);
    console.log("New vehicle data has been added.");

    // Disconnect from the database
    mongoose.connection.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error destroying and seeding data:", error);
    process.exit(1);
  }
};

destroyAndSeed();
