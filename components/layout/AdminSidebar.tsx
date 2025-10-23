"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/elections", label: "Manage Elections" },
    { href: "/admin/candidates", label: "Manage Candidates" },
    { href: "/admin/voters", label: "Manage Voters" },
    { href: "/admin/news", label: "Manage News" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-2 rounded-lg ${
                pathname === link.href
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
