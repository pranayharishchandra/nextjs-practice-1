"use client"; // Only needed in app directory for interactivity
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-base-100 shadow-md">
      <div className="navbar container mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl font-bold text-primary">
            PranayNext
          </Link>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex space-x-4">
          {/* Edit these links as needed */}
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
        <div className="flex-none md:hidden">
          <label htmlFor="menu-toggle" className="btn btn-ghost btn-square">
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
          </label>
        </div>

        {/* Mobile Menu */}
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <div className="menu menu-compact absolute top-14 left-0 w-full bg-base-100 z-10 shadow-lg hidden peer-checked:flex flex-col space-y-2 p-4 md:hidden">
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
      </div>
    </nav>
  );
}
