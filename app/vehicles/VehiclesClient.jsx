"use client";

import { useState, useEffect } from "react";
import VehicleCard from "@/components/VehicleCard";

export default function VehiclesClient({ vehiclesData }) {
  const [vehicles, setVehicles] = useState(vehiclesData);
  const [category, setCategory] = useState("");
  const [price, setPrice]       = useState("");

  useEffect(() => {
    let filteredVehicles = vehiclesData;

    if (category) {
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.type === category);
    }

    if (price) {
      filteredVehicles = filteredVehicles.filter((vehicle) => vehicle.price <= price);
    }

    setVehicles(filteredVehicles);
  }, [category, price, vehiclesData]);

  return (
    <>
      {/* Filters */}
      <div className = "flex gap-4 mb-6">
        <select
          className = "select select-bordered"
          value     = {category}
          onChange  = {(e) => setCategory(e.target.value)}
        >
          <option value = "">All Types</option>
          <option value = "car">Car</option>
          <option value = "bike">Bike</option>
        </select>
        <input
          type        = "number"
          placeholder = "Max Price"
          className   = "input input-bordered"
          value       = {price}
          onChange    = {(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Vehicles */}
      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key = {vehicle._id} vehicle = {vehicle} />
        ))}
      </div>
    </>
  );
}
