"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
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
          <Link href="/posts/all" className="btn btn-ghost text-base">
            Posts
          </Link>
          <Link href="/profile" className="btn btn-ghost text-base">
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="btn btn-ghost btn-square md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-full z-10 shadow-lg flex flex-col space-y-2 p-4 md:hidden bg-blue-900">
            <Link href="/" className="btn btn-ghost">
              Home
            </Link>
            <Link href="/notifications" className="btn btn-ghost">
              Notifications
            </Link>
            <Link href="/profile" className="btn btn-ghost">
              Profile
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
