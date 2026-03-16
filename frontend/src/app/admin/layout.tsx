"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Heart, Image as ImageIcon, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const MENU = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Donations", icon: Heart, href: "/admin/donations" },
    { name: "Gallery", icon: ImageIcon, href: "#" },
    { name: "Users", icon: Users, href: "#" },
    { name: "Settings", icon: Settings, href: "#" },
  ];

  return (
    <div className="flex h-screen bg-sandstone overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-maroon text-white flex flex-col h-full shadow-2xl relative z-20">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center text-white font-serif font-bold text-xl">
            ॐ
          </div>
          <span className="font-serif text-lg font-bold truncate">Admin Panel</span>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {MENU.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/10 text-white/80 hover:text-white"
            >
              <item.icon className="w-5 h-5 text-saffron" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-red-500/20 text-red-300 hover:text-red-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto bg-sandstone">
        <header className="bg-white px-8 py-5 border-b border-maroon/5 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="font-serif text-2xl font-bold text-maroon">Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground/70">Welcome, Super Admin</span>
            <div className="w-10 h-10 rounded-full bg-saffron/20 border-2 border-saffron flex items-center justify-center text-maroon font-serif font-bold">
              SA
            </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
