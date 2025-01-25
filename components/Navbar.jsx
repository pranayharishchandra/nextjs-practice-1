"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-900/70 text-white shadow-md fixed top-0 left-0 w-full z-50 backdrop-blur-lg">
      <div className="navbar container mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-purple-300">
            Motor24
          </Link>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="btn btn-ghost text-base">
            Home
          </Link>
          <Link href="/vehicles" className="btn btn-ghost text-base">
            All Vehicles
          </Link>
          {session ? (
            <>
              <Link href="/profile" className="btn btn-ghost text-base">
                Profile
              </Link>
              <button
                className="btn btn-ghost text-base"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-ghost text-base" onClick={() => signIn()}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
