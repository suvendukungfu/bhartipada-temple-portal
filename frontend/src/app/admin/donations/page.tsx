"use client";

import { Search, Download, Filter } from "lucide-react";
import { useState } from "react";

const ALL_TXS = [
  { id: "TX1205", name: "Suresh Patil", amount: 21000, date: "2024-03-16", paymentMode: "UPI", status: "Success", purpose: "Temple Gates" },
  { id: "TX1204", name: "Ramesh Sharma", amount: 11000, date: "2024-03-16", paymentMode: "NetBanking", status: "Success", purpose: "General Donation" },
  { id: "TX1203", name: "A Devotee", amount: 5100, date: "2024-03-15", paymentMode: "Card", status: "Success", purpose: "Festival Fund" },
  { id: "TX1202", name: "Smita Dash", amount: 1001, date: "2024-03-15", paymentMode: "UPI", status: "Pending", purpose: "Temple Flooring" },
  { id: "TX1201", name: "Hari Prasad", amount: 2100, date: "2024-03-14", paymentMode: "UPI", status: "Success", purpose: "Temple Lighting" },
  { id: "TX1200", name: "Ananya Iyer", amount: 501, date: "2024-03-13", paymentMode: "Card", status: "Failed", purpose: "General Donation" },
];

export default function AdminDonationsTable() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = ALL_TXS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-maroon/5 overflow-hidden">
      <div className="p-6 border-b border-maroon/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-maroon">Donation Records</h2>
          <p className="text-sm text-foreground/60">Manage and track all devotee contributions.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-foreground/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search ID, Name, Purpose..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-sandstone border border-maroon/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-saffron/50 w-full md:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-maroon/10 rounded-lg text-sm hover:bg-sandstone transition-colors font-medium">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-saffron text-white rounded-lg text-sm hover:bg-saffron/90 transition-colors font-medium shadow-sm shadow-saffron/20">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-sandstone/50 bg-opacity-50 text-maroon">
              <th className="px-6 py-4 font-bold text-sm tracking-wide">TXN ID</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Devotee Name</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Amount</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Payment Mode</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Purpose</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Date</th>
              <th className="px-6 py-4 font-bold text-sm tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-maroon/5">
            {filtered.map(tx => (
              <tr key={tx.id} className="hover:bg-sandstone/30 transition-colors">
                <td className="px-6 py-4 font-medium text-sm text-foreground/80">{tx.id}</td>
                <td className="px-6 py-4 font-medium text-foreground">{tx.name}</td>
                <td className="px-6 py-4 font-bold text-maroon">₹{tx.amount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-sm text-foreground/70">{tx.paymentMode}</td>
                <td className="px-6 py-4 text-sm text-foreground/70">{tx.purpose}</td>
                <td className="px-6 py-4 text-sm text-foreground/70 text-nowrap">{tx.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    ${tx.status === 'Success' ? 'bg-green-100 text-green-700' : 
                      tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}`
                  }>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-foreground/50">
                  No records found for "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Mock */}
      <div className="p-4 border-t border-maroon/10 flex items-center justify-between text-sm text-foreground/60 bg-sandstone/30">
        <span>Showing 1 to {filtered.length} of {filtered.length} results</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-maroon/10 hover:bg-white rounded disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 bg-white border border-maroon/10 text-saffron font-bold rounded">1</button>
          <button className="px-3 py-1 border border-maroon/10 hover:bg-white rounded disabled:opacity-50" disabled>Next</button>
        </div>
      </div>
    </div>
  );
}
