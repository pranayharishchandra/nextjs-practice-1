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

//! export async function GET(request, { searchParams }) { // this don't work like "params" because
//* "params" should work for dynamic segments (e.g., /posts/:slug). 
//* However, "query parameters" (i.e., parameters after the ? in the URL) are handled a little differently. 

export async function GET(request) {
  await connectDB();

  // const data = await request.json();

  // request.pranay = "😍😍😍😍😍😍hello ji"
  //? console.log( request } 
  //? console.log( {$lte: parseFloat}); //? { '$lte': [Function: parseFloat] } 
  // return NextResponse.json("hello paaji", { status: 200 });

  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const category         = searchParams.get("category");
  const price            = searchParams.get("price");

  console.log("😍😍😍😍😍😍hello ji", category, price) //* http://localhost:3000/api/vehicles?price=10000 - null 10000
  // Build the query - if they exists 
  const query = {};
  if (category) query.type = category;
  
  //? following both are same, as key anyway converted to string always: $lte == '$lte'
  // if (price)   query.price = { '$lte': parseFloat(price) };
  if (price)   query.price = { '$lte': parseFloat(price) };

  try {
    // Fetch vehicles from the database
    const vehicles = await Vehicle.find(query).lean();
    return NextResponse.json(vehicles, { status: 200 });
  } 
  catch (error) {
    console.error("Error fetching vehicles:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
