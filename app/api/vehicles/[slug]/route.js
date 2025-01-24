//! API for `/api/vehicles/:slug`

import connectDB from "@/config/database";
import Vehicle from "@/models/Vehicle";

export async function GET(req, { params }) {
  // Destructure `slug` from `params`
  const { slug } = await params;

  // Connect to the database
  try {
    await connectDB();

    // Find the vehicle by slug
    const vehicle = await Vehicle.findOne({ slug }).lean();

    if (!vehicle) {
      return new Response(JSON.stringify({ error: "Vehicle not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return the vehicle data
    return new Response(JSON.stringify(vehicle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
