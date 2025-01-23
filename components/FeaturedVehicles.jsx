import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";
import VehicleCard from "@/components/VehicleCard";

export default async function FeaturedVehicles() {
  await connectDB();

  // Fetch 3 random vehicles
  const vehicles = await Vehicle.aggregate([{ $sample: { size: 3 } }]);

  return (
    <>
      <h1>Random 3 Featured Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </>
  );
}
