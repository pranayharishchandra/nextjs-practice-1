//! API for `/api/vehicles`

// import ensureDbConnected from '@/middleware/ensureDbConnected';
// import Vehicle from '@/models/Vehicle';

// export async function GET(req, res) {
//   await ensureDbConnected(req, res, async () => {
//     const vehicles = await Vehicle.find();
//     res.json(vehicles);
//   });
// }

// export async function POST(req, res) {
//   await ensureDbConnected(req, res, async () => {
//     const { name, type, price, stock, image } = req.body;
//     const vehicle = new Vehicle({ name, type, price, stock, image });
//     await vehicle.save();
//     res.status(201).json(vehicle);
//   });
// }

import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";

export async function GET(request) {
  await connectDB();

  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const price = searchParams.get("price");

  // Build the query
  const query = {};
  if (category) query.type = category;
  if (price) query.price = { $lte: parseFloat(price) };

  try {
    // Fetch vehicles from the database
    const vehicles = await Vehicle.find(query).lean();

    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
