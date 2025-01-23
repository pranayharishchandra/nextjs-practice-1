import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";
import VehiclesClient from "./VehiclesClient"; // Import the client component

export default async function VehiclesPage() {
  // Connect to MongoDB
  await connectDB();

  // Fetch all vehicles
  const vehicles = await Vehicle.find({}).lean();

  // Convert the data to plain JSON
  const sanitizedVehicles = vehicles.map((vehicle) => ({
    ...vehicle,
    _id: vehicle._id.toString(), // Convert ObjectId to string
    description: vehicle.description || {}, // Ensure description is plain object
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
      {/* Pass sanitized data to the client component */}
      <VehiclesClient vehiclesData={sanitizedVehicles} />
    </div>
  );
}
