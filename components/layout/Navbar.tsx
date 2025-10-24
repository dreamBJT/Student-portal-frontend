"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#002B7F] shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            OPVS
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/elections" className="text-white hover:text-[#FFB400]">
              Elections
            </Link>
            <Link href="/news" className="text-white hover:text-[#FFB400]">
              News
            </Link>
            <Link href="/leaders" className="text-white hover:text-[#FFB400]">
              Leaders
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              href="/auth/login"
              className="px-5 py-2 bg-[#FFB400] text-gray font-medium rounded-md hover:bg-[#e6a200] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
