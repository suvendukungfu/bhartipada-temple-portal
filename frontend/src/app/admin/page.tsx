"use client";

import { HandCoins, Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Jan', amount: 40000 },
  { name: 'Feb', amount: 30000 },
  { name: 'Mar', amount: 55000 },
  { name: 'Apr', amount: 27000 },
  { name: 'May', amount: 48000 },
  { name: 'Jun', amount: 80000 },
];

const RECENT_TX = [
  { id: "TX1204", name: "Ramesh Sharma", amount: 11000, date: "2 mins ago", status: "Success" },
  { id: "TX1203", name: "A Devotee", amount: 5100, date: "15 mins ago", status: "Success" },
  { id: "TX1202", name: "Smita Dash", amount: 1001, date: "1 hour ago", status: "Pending" },
  { id: "TX1201", name: "Hari Prasad", amount: 2100, date: "3 hours ago", status: "Success" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
            <HandCoins className="w-6 h-6 text-saffron" />
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-1">Total Collections</p>
            <h3 className="text-3xl font-serif font-bold text-maroon">₹4,25,000</h3>
            <p className="text-xs text-green-600 font-medium mt-1">+12% from last month</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-maroon/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-maroon" />
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-1">Active Devotees</p>
            <h3 className="text-3xl font-serif font-bold text-maroon">1,204</h3>
            <p className="text-xs text-green-600 font-medium mt-1">+5% new this week</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-foreground/60 mb-1">Success Rate</p>
            <h3 className="text-3xl font-serif font-bold text-maroon">98.5%</h3>
            <p className="text-xs text-foreground/50 font-medium mt-1">Payment completion</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-maroon/5">
          <h3 className="font-serif font-bold text-lg text-maroon mb-6">Donation Trends</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent TXs */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-maroon/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif font-bold text-lg text-maroon">Recent Activity</h3>
            <button className="text-sm text-saffron font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {RECENT_TX.map(tx => (
              <div key={tx.id} className="flex justify-between items-center p-3 hover:bg-sandstone/40 rounded-xl transition-colors">
                <div>
                  <p className="font-bold text-sm text-foreground mb-0.5">{tx.name}</p>
                  <p className="text-xs text-foreground/50">{tx.id} • {tx.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-maroon">₹{tx.amount.toLocaleString('en-IN')}</p>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${tx.status === 'Success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
