// * METHOD 2: Fetching from API

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

//* async function to fetch the data (api)
async function fetchVehicle(slug) {
  try {
    const res = await fetch(`/api/vehicles/${slug}`);
    if (!res.ok) {
      throw new Error("Failed to fetch vehicle data");
    }
    const data = await res.json();
    return data; //* data will be wrapped in a promise and sent to VehicleDeatil, where is be resolved and used
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function VehicleDetail() {
  const { slug }                  = useParams();     // Get the slug from the URL
  const [vehicle, setVehicle]     = useState(null);  // State to hold vehicle data
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    if (!slug) return;  //! Ensure slug exists
    console.log("Fetching vehicle data for slug:", slug);
    fetchVehicle(slug)
      .then((data) => {
        setVehicle  (data);   // Update state with fetched data
        setIsLoading(false);  // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching vehicle:", error);
        setIsLoading(false);
      });
  }, [slug]);
  //* }, []);   
  //* this empty [] dependency list also will work, as data being fetched only once and slug value don't change

  if (isLoading) {
    return <div>Loading...</div>;  // Show a loading state
  }

  if (!vehicle) {
    return <div>Vehicle not found.</div>;  // Handle case where no vehicle is found
  }

  return (
    <div className = "container mx-auto my-8">
    <h1  className = "text-3xl font-bold mb-4">{vehicle.name}</h1>
      <img
        src       = {vehicle.image}
        alt       = {vehicle.name}
        className = "w-full h-80 object-cover rounded mb-6"
      />
      <table className = "table-auto w-full border">
        <thead>
          <tr>
            <th className = "border px-4 py-2">Attribute</th>
            <th className = "border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className = "border px-4 py-2">Engine Capacity</td>
            <td className = "border px-4 py-2">{vehicle.description?.engineCapacity || "N/A"}</td>
          </tr>
          <tr>
            <td className = "border px-4 py-2">Mileage</td>
            <td className = "border px-4 py-2">{vehicle.description?.mileage || "N/A"}</td>
          </tr>
          <tr>
            <td className = "border px-4 py-2">Fuel Tank</td>
            <td className = "border px-4 py-2">{vehicle.description?.fuelTank || "N/A"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


/*
* Method 1: Use Server Components (Recommended for App Router)
import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";

export default async function VehicleDetail({ params }) {

  // return <div>hello paaji</div>
  // const { slug } = params;
  const { slug } = await params; //! don't forget to await

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
 */