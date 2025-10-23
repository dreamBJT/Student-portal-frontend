"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/superadmin", label: "Dashboard" },
    { href: "/superadmin/users", label: "User Management" },
    { href: "/superadmin/admins", label: "Admin Management" },
    { href: "/superadmin/system", label: "System Settings" },
    { href: "/superadmin/logs", label: "Activity Logs" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Super Admin</h2>
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
