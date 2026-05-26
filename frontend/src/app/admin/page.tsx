"use client";

import React from "react";
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie 
} from "recharts";
import { 
  Users, IndianRupee, Heart, Activity, ArrowUpRight, 
  MapPin, Calendar, MessageSquare, ShieldCheck, Search, Filter 
} from "lucide-react";

const DATA = [
  { name: "Mon", revenue: 4000, donors: 24, engagement: 400 },
  { name: "Tue", revenue: 3000, donors: 13, engagement: 200 },
  { name: "Wed", revenue: 2000, donors: 98, engagement: 900 },
  { name: "Thu", revenue: 2780, donors: 39, engagement: 390 },
  { name: "Fri", revenue: 1890, donors: 48, engagement: 480 },
  { name: "Sat", revenue: 2390, donors: 38, engagement: 380 },
  { name: "Sun", revenue: 3490, donors: 43, engagement: 430 },
];

const PIE_DATA = [
  { name: "UPI", value: 400, color: "#FF9933" },
  { name: "Cards", value: 300, color: "#800000" },
  { name: "EMI", value: 100, color: "#FFD700" },
  { name: "NetBanking", value: 200, color: "#FAF3E0" },
];

const STATS = [
  { label: "Spiritual Revenue", value: "₹12,40,501", growth: "+18%", icon: IndianRupee },
  { label: "Active Devotees", value: "5,248", growth: "+12%", icon: Users },
  { label: "Wall Blessings", value: "2,854", growth: "+25%", icon: Heart },
  { label: "Virtual Darshan", value: "48.2K", growth: "+42%", icon: Activity },
];

export default function AdminDashboard() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-sandstone/10 p-10 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-serif font-black text-maroon flex items-center gap-3">
             <ShieldCheck className="w-10 h-10 text-saffron" />
             Temple Management Engine
          </h1>
          <p className="text-maroon/50 font-medium tracking-wide mt-1 uppercase text-xs">Administrative High-Command • Real-time Stream</p>
        </div>
        
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-maroon/5">
           <div className="flex items-center gap-2 px-4 border-r border-maroon/10">
              <Search className="w-4 h-4 text-maroon/30" />
              <input className="bg-transparent outline-none text-sm placeholder:text-maroon/20" placeholder="Search devotees..." />
           </div>
           <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-maroon/60 hover:text-maroon transition-colors">
              <Filter className="w-4 h-4" />
              Filter
           </button>
        </div>
      </div>

      {/* Impact Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-maroon/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-saffron/5 to-transparent rounded-bl-full" />
            <div className="flex justify-between items-start mb-6">
               <div className="w-14 h-14 bg-saffron/5 rounded-2xl flex items-center justify-center text-saffron group-hover:bg-saffron group-hover:text-white transition-all duration-500">
                  <stat.icon className="w-8 h-8" />
               </div>
               <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-full flex items-center gap-1 border border-green-100">
                  {stat.growth}
                  <ArrowUpRight className="w-3 h-3" />
               </div>
            </div>
            <p className="text-maroon/30 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
            <h3 className="text-3xl font-black text-maroon mt-2 tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Analytics Hub */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[3rem] shadow-2xl border border-maroon/5">
          <div className="flex justify-between items-center mb-12">
             <h4 className="text-2xl font-serif font-black text-maroon">Divine Engagement & Revenue</h4>
             <div className="flex gap-2">
                <span className="flex items-center gap-2 text-xs font-bold text-maroon/30"><div className="w-3 h-3 rounded-full bg-saffron" /> Revenue</span>
                <span className="flex items-center gap-2 text-xs font-bold text-maroon/30"><div className="w-3 h-3 rounded-full bg-maroon" /> Engagement</span>
             </div>
          </div>
          <div className="h-96 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9933" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#FF9933" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#800000" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#FF9933" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="engagement" stroke="#800000" strokeWidth={4} fillOpacity={1} fill="url(#colorEng)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-sandstone/5 rounded-4xl border border-dashed border-maroon/10 animate-pulse flex items-center justify-center text-maroon/30 text-sm font-bold">
                Analyzing Divine Stream...
              </div>
            )}
          </div>
        </div>

        {/* Payment Channels */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[3rem] shadow-2xl border border-maroon/5 flex flex-col items-center">
          <h4 className="text-xl font-serif font-black text-maroon mb-10 w-full text-left">Payment Sources</h4>
          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full bg-sandstone/5 rounded-full border border-dashed border-maroon/10 animate-pulse flex items-center justify-center text-maroon/30 text-sm font-bold max-w-[16rem] mx-auto">
                Channels...
              </div>
            )}
          </div>
          <div className="w-full space-y-4 mt-10">
             {PIE_DATA.map((item, i) => (
               <div key={i} className="flex justify-between items-center bg-sandstone/5 p-4 rounded-2xl">
                  <div className="flex items-center gap-3">
                     <div className="w-4 h-4 rounded-full" style={{ background: item.color }} />
                     <span className="text-sm font-bold text-maroon/60">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-maroon">{item.value}+</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Recent Connects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-maroon/5 flex items-center gap-6 group hover:bg-maroon transition-all duration-500">
           <Calendar className="w-12 h-12 text-saffron group-hover:text-white" />
           <div>
              <h5 className="font-bold text-maroon group-hover:text-white">Upcoming Jatra</h5>
              <p className="text-xs text-maroon/40 group-hover:text-white/50">Next Event: 12 April 2026</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-maroon/5 flex items-center gap-6 group hover:bg-maroon transition-all duration-500">
           <MessageSquare className="w-12 h-12 text-saffron group-hover:text-white" />
           <div>
              <h5 className="font-bold text-maroon group-hover:text-white">New Blessings</h5>
              <p className="text-xs text-maroon/40 group-hover:text-white/50">124 pending approvals</p>
           </div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-maroon/5 flex items-center gap-6 group hover:bg-maroon transition-all duration-500">
           <MapPin className="w-12 h-12 text-saffron group-hover:text-white" />
           <div>
              <h5 className="font-bold text-maroon group-hover:text-white">Global Reach</h5>
              <p className="text-xs text-maroon/40 group-hover:text-white/50">Visitors from 42 countries</p>
           </div>
        </div>
      </div>
    </div>
  );
}
