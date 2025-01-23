import mongoose from 'mongoose';
import Vehicle from '../models/Vehicle';
import dbConnect from '../lib/dbConnect';

const seedData = async () => {
  await dbConnect();

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

  await Vehicle.deleteMany();  // Clear existing data
  await Vehicle.insertMany(vehicles);

  console.log('Database seeded successfully!');
  mongoose.connection.close();
};

seedData().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});
