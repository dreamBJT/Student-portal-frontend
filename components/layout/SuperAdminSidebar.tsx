"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

export default function SuperAdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/superadmin", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/superadmin/users", label: "User Management", Icon: Users },
    { href: "/superadmin/admins", label: "Admin Management", Icon: UserCog },
    { href: "/superadmin/system", label: "System Settings", Icon: Settings },
    { href: "/superadmin/logs", label: "Activity Logs", Icon: FileText },
  ];

  return (
    <aside className="w-64 bg-[#002B7F] text-white flex flex-col h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-white/20">
        <div className="bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
          IU
        </div>
        <div>
          <h1 className="text-lg font-semibold">OPVS-IU</h1>
          <p className="text-sm opacity-80">Super Admin</p>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-2">
        {links.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/superadmin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-4 px-6 py-4 rounded-xl transition-colors ${
                active
                  ? "bg-[#0B3CA8]/80 hover:bg-[#0B3CA8] before:content-[''] before:absolute before:left-1.5 before:top-1/2 before:-translate-y-1/2 before:h-7 before:w-1.5 before:rounded-full before:bg-yellow-400"
                  : "hover:bg-white/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/20">
        <button className="flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
        <p className="text-xs opacity-70 mt-2">© 2025 Injibara University</p>
      </div>
    </aside>
  );
}
