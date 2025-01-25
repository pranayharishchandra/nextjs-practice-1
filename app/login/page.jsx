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
            Welcome! Please login to your GitHub account.
          </p>

          {/* Login Button */}
          <div className="form-control w-full max-w-xs mx-auto">
            <button
              className="btn btn-primary w-full mb-2"
              onClick={() => signIn("github", { callbackUrl: "/" })}
            >
              Login with GitHub
            </button>
          </div>

          {/* Signup Link */}
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



// export default function LoginPage() {
//   return <div>Login krlo fraands</div>
// }