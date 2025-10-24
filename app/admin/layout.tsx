"use client";

import React from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { useAuthContext } from "@/contexts/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext?.() ?? { user: null } as any;
  const name = user?.name || "Admin User";
  const email = user?.email || "admin@domain.com";
  const initials = (name || "A U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-end mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-full px-2 py-1 hover:bg-gray-100">
                <span className="hidden sm:block text-right">
                  <span className="block text-sm font-medium">{name}</span>
                  <span className="block text-xs text-gray-500">{email}</span>
                </span>
                <span className="w-9 h-9 rounded-full bg-blue-900 text-white flex items-center justify-center font-semibold">
                  {user ? initials : <User className="w-4 h-4" />}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem disabled>Signed in as {email}</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/" className="flex items-center w-full">
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {children}
      </main>
    </div>
  );
}
