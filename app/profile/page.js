"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login page if not logged in
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-ring loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={session.user.image || "/default-avatar.png"} // Fallback to a default image
            alt={session.user.name}
            width={64}
            height={64}
            className="rounded-full border border-gray-200 shadow-md"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Welcome, {session.user.name}!
            </h1>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="btn btn-primary w-full"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
