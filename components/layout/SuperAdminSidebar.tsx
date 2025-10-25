"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Database,
  Shield,
  Lock,
  FileText,
  LogOut,
  UserCog,
  Settings,
} from "lucide-react";

export default function SuperAdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Redirect to home screen
    router.push("/");
  };

  const links = [
    { href: "/superadmin", label: "Dashboard", Icon: LayoutDashboard },
    { href: "/superadmin/UserManagementPage", label: "User Management", Icon: Users },
    {
      href: "/superadmin/DatabaseBackupPage",
      label: "Database & Backup",
      Icon: Database,
    },
    { href: "/superadmin/SecurityPage", label: "Security Center", Icon: Lock },
    { href: "/superadmin/ActivityLogsPage", label: "Activity Logs", Icon: FileText },
    { href: "/superadmin/SystemSettingsPage", label: "System Settings", Icon: Settings },
  ];

  return (
    <aside className="w-64 text-white flex flex-col min-h-screen bg-gradient-to-b from-[#08307a] to-[#001f4d]">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#FFB400] flex items-center justify-center">
            <Shield className="text-[#00205a]" size={20} />
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold">Super Admin</h2>
            <p className="text-sm text-[#cfe0ff]">OPVS-IU Control</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        {links.map(({ href, label, Icon }) => {
          const active =
            pathname === href ||
            (href !== "/superadmin" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className="block">
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                  active
                    ? "bg-[#FFB400] text-[#00205a] shadow-md"
                    : "text-white hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`${
                    active ? "text-[#00205a]" : "text-white"
                  } w-5 h-5`}
                />
                <span className="font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 bg-[#08307a] border border-white/20 rounded-lg shadow-sm transition-all duration-150 hover:bg-[#001f4d] hover:shadow-md w-full"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-sm font-medium text-white">Logout</span>
        </button>
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-5 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
            <span className="font-semibold">SA</span>
          </div>
          <div>
            <p className="text-sm font-medium">Super Admin</p>
            <p className="text-xs text-[#cfe0ff]">OPVS-IU Control</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
