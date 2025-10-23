"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            OPVS
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/elections" className="text-gray-600 hover:text-gray-900">
              Elections
            </Link>
            <Link href="/news" className="text-gray-600 hover:text-gray-900">
              News
            </Link>
            <Link href="/leaders" className="text-gray-600 hover:text-gray-900">
              Leaders
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
