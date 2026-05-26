"use client";

import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Trophy, Star, ShieldCheck } from "lucide-react";

const DONORS = [
  { name: "Rajesh Mohanty", amount: "₹51,001", date: "2 hours ago", type: "Gold" },
  { name: "Sourav Mishra", amount: "₹1,101", date: "5 hours ago", type: "Contributor" },
  { name: "Anonymous Devotee", amount: "₹5,001", date: "12 hours ago", type: "Star" },
  { name: "Priyanka Jena", amount: "₹11,001", date: "1 day ago", type: "Patron" },
  { name: "Amit Sahani", amount: "₹2,501", date: "1 day ago", type: "Contributor" },
  { name: "Anonymous Devotee", amount: "₹501", date: "2 days ago", type: "Contributor" },
];

export function DonorWall() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-saffron font-bold text-sm tracking-widest uppercase mb-4">
             <Trophy className="w-5 h-5" />
             Shila-Lekha
          </div>
          <h2 className="text-5xl font-serif font-bold text-maroon mb-4">Pillar of Devotion</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-xl mx-auto text-maroon/60">
            A tribute to the noble souls who have contributed to the rebuilding of our spiritual heritage.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Scrollable wall */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DONORS.map((donor, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-maroon/5 hover:border-saffron/30 transition-all hover:scale-[1.03] group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-sandstone rounded-2xl flex items-center justify-center text-maroon group-hover:bg-saffron group-hover:text-white transition-colors">
                      {donor.type === "Gold" ? <Trophy className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-maroon/30">{donor.date}</span>
                  </div>
                  
                  <h4 className="font-serif font-bold text-xl text-maroon mb-1">{donor.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-saffron">{donor.amount}</span>
                    <div className="w-1 h-1 bg-maroon/20 rounded-full" />
                    <span className="text-xs text-maroon/40 uppercase font-bold tracking-tighter">{donor.type}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-maroon/5 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-green-600" />
                     <span className="text-[10px] font-bold text-green-600 uppercase">Verified Donation</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Gradients to suggest more */}
          <div className="absolute -bottom-10 left-0 right-0 h-32 bg-linear-to-t from-cream to-transparent" />
        </div>

        <div className="mt-16 text-center">
           <button className="bg-transparent border-2 border-maroon/20 text-maroon hover:border-maroon hover:bg-maroon hover:text-white px-8 py-4 rounded-2xl font-bold transition-all">
             View All Donors
           </button>
        </div>
      </div>
    </section>
  );
}
