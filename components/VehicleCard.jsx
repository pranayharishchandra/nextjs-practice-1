import Image from "next/image";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="card w-80 bg-base-100 shadow-md">
      <figure>
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={300}
          height={200}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.name}</h2>
        <p>Type: {vehicle.type}</p>
        <p>Price: ${vehicle.price}</p>
        <p>Stock: {vehicle.stock} available</p>
      </div>
    </div>
  );
}
