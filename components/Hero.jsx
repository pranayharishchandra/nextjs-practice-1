"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero({ vehicles }) {
  const [featuredVehicles, setFeaturedVehicles] = useState([]);

  useEffect(() => {
    // Shuffle and pick 5 vehicles for the carousel
    const shuffled = [...vehicles].sort(() => 0.5 - Math.random());
    setFeaturedVehicles(shuffled.slice(0, 5));
  }, [vehicles]);

  return (
    <div className="carousel w-full">
      {featuredVehicles.map((vehicle, index) => (
        <div
          key={vehicle.id}
          id={`slide${index}`}
          className="carousel-item relative w-full"
        >
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            width={1200}
            height={400}
            className="w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-4 rounded">
            <h2 className="text-xl font-bold">{vehicle.name}</h2>
            <p>${vehicle.price}</p>
          </div>
          <div className="absolute flex justify-between w-full bottom-2">
            <a href={`#slide${(index - 1 + 5) % 5}`} className="btn btn-circle">
              ❮
            </a>
            <a href={`#slide${(index + 1) % 5}`} className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
