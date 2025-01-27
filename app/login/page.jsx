"use client"; // Ensure this component is a client component

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="card w-96 shadow-xl bg-white">
        <div className="card-body">

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
          <p className="text-center text-sm text-gray-500">
            Welcome! Please login to your account using GitHub or Google.
          </p>

          {/* Login Buttons */}
          <div className="form-control w-full max-w-xs mx-auto">
            <button
              className="btn btn-primary w-full mb-2"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              Login with GitHub
            </button>
            <button
              className="btn btn-secondary w-full"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              Login with Google
            </button>
          </div>

          {/* Signup Link */}
          {/* Uncomment if you plan to have a registration flow */}
          {/* <p className="text-sm text-gray-500 text-center mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign Up
            </a>
          </p> */}

        </div>
      </div>
    </div>
  );
}
