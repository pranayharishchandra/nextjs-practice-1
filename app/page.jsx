import FeaturedVehicles from "@/components/FeaturedVehicles";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to Motor24</h1>
      <FeaturedVehicles />
    </div>
  );
}
