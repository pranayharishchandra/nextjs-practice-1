import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";

export default async function VehicleDetail({ params }) {

  // return <div>hello paaji</div>
  // const { slug } = params;
  const { slug } = await params;

  // Connect to the database
  await connectDB();

  // Find the vehicle by slug
  // const vehicle = await Vehicle.findOne({ slug }).lean();
  const vehicle = await Vehicle.findOne({ slug })

  if (!vehicle) {
    return <div>Vehicle not found.</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{vehicle.name}</h1>
      <img
        src={vehicle.image}
        alt={vehicle.name}
        className="w-full h-80 object-cover rounded mb-6"
      />
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Attribute</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Engine Capacity</td>
            <td className="border px-4 py-2">{vehicle.description.engineCapacity || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Mileage</td>
            <td className="border px-4 py-2">{vehicle.description.mileage || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Fuel Tank</td>
            <td className="border px-4 py-2">{vehicle.description.fuelTank || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
