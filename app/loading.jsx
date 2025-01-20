import Spinner from "@/components/Spinner";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      <Spinner />
    </div>
  );
}
