//! API for `/api/vehicles/:slug`

import dbConnect from '@/config/dbConnect';
import Vehicle from '@/models/Vehicle';

export default async function VehiclePage({ params }) {
  await dbConnect();

  const vehicle = await Vehicle.findById(params.slug);
  if (!vehicle) {
    return <h1>Vehicle not found</h1>;
  }

  return (
    <div>
      <h1>{vehicle.name}</h1>
      <p>Type: {vehicle.type}</p>
      <p>Price: ${vehicle.price}</p>
      <p>Stock: {vehicle.stock}</p>
      <img src={vehicle.image} alt={vehicle.name} />
    </div>
  );
}
