import Image from "next/image";
import Link from "next/link";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="card w-80 bg-base-100 shadow-md">
      <figure>
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{vehicle.name}</h2>
        <p>Type: {vehicle.type}</p>
        <p>Price: ${vehicle.price}</p>
        <p>Stock: {vehicle.stock} available</p>
        <div className="card-actions mt-4">
          {/* Button to view vehicle details */}
          {/* <Link href={`/vehicle/${vehicle._id}`} passHref> */}
          <Link href={`/vehicles/${vehicle.slug}`} passHref>
            <button className="btn btn-primary">View Details</button>
          </Link>

          {/* Placeholder for Buy Vehicle button */}
          <button className="btn btn-secondary" disabled>
            Buy Vehicle
          </button>
        </div>
      </div>
    </div>
  );
}
