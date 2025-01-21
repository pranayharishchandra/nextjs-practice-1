"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import VehicleCard from "@/components/VehicleCard";

export default function Home() {
  //`useState` variables that are responsible for change in UI (thus needs to be tracked)
  const [vehicles, setVehicles]                 = useState([]); // original shoud not be touched, (only 1 time when data fetching)
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters]                   = useState({ price: "", type: "" });

  //TODO: fetch from MongoDB
  useEffect(() =>  {
    // Fetch the vehicle data
    fetch("/vehicles.json")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setFilteredVehicles(data);
      });
  }, []);

  const applyFilters = () => {
    let filtered = vehicles;

    // 1. filter by "type"
    if (filters.type) {
      filtered = filtered.filter((v) => v.type === filters.type);
    }
    // 2. filter by "price"
    if (filters.price) {
      const priceLimit = parseInt(filters.price, 10);
            filtered   = filtered.filter((v) => v.price <= priceLimit);
    }

    setFilteredVehicles(filtered);
  };

  // change in the filters (price or category) will change tigger apply filters
  // hence new data will be show, since we need to track the filter, we used "useState"
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className = "container mx-auto">
      {/* Hero Section */}
      <Hero vehicles = {vehicles} />

      {/* Filters, 
      //TODO: filters as diffrent component imported here */}
      <div className = "flex flex-wrap items-center gap-4 my-8">
        <select
          className = "select select-bordered"
          onChange  = {(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value = "">All Types</option>
          <option value = "car">Car</option>
          <option value = "bike">Bike</option>
        </select>
        <input
          type        = "number"
          placeholder = "Max Price"
          className   = "input input-bordered"
          onChange    = {(e) => setFilters({ ...filters, price: e.target.value })}
        />
      </div>

      {/* VehicleCards */}
      <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key = {vehicle._id} vehicle = {vehicle} />
        ))}
      </div>
    </div>
  );
}
