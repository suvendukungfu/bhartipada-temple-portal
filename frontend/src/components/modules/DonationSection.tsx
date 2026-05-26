"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Heart, ShieldCheck, CreditCard } from "lucide-react";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: new (options: unknown) => { open: () => void };
  }
}

const AMOUNTS = [501, 1101, 2101, 5101, 11001];

const NEEDS = [
  { title: "Annadanam (Food Distribution)", current: 75, target: 100 },
  { title: "Sanskrit Pathshala Construction", current: 40, target: 100 },
  { title: "Temple Illumination Project", current: 90, target: 100 },
];

export function DonationSection() {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState(AMOUNTS[1]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [panRequired, setPanRequired] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pan: "",
  });

  const handleDonate = async () => {
    if (!formData.name || !formData.phone) {
      alert("Please enter name and phone");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: selectedAmount,
          receipt: `rcpt_${Date.now()}`
        }),
      });
      
      const order = await res.json();
      
      if (order.error) throw new Error(order.error);

      const options = {
        key: process.env.NEXT_PUBLIC_RZP_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Bhartipada Temple",
        description: "Temple Seva / Donation",
        order_id: order.id,
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              metadata: {
                amount: selectedAmount,
                donorName: formData.name,
                isAnonymous,
                panNumber: formData.pan
              }
            }),
          });
          const result = await verifyRes.json();
          if (result.status === 'ok') {
            alert("Payment successful! Thank you for your contribution.");
            window.location.reload();
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: "#FF9933",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="py-24 bg-maroon-gradient text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <FadeIn direction="right">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-8 leading-tight">
              {t("donate.pledge")}
            </h2>
            <p className="text-cream/70 text-lg mb-12 leading-relaxed">
              {t("donate.desc")}
            </p>

            <div className="space-y-8">
              {NEEDS.map((need, i) => (
                <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold text-temple-gold">{need.title}</h4>
                    <span className="text-cream/50 text-sm">{need.current}% Completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${need.current}%` }}
                      className="h-full bg-saffron"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-saffron/30 flex gap-4 items-center">
               <ShieldCheck className="w-12 h-12 text-saffron shrink-0" />
               <div className="text-sm">
                 <p className="font-bold text-temple-gold mb-1">Tax Exemptions Available</p>
                 <p className="text-cream/60">{t("donate.tax_note")}</p>
               </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" className="bg-sandstone p-10 rounded-[3rem] shadow-4xl text-maroon border-8 border-white">
            <div className="mb-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-maroon rounded-xl flex items-center justify-center text-white">
                <Heart className="w-6 h-6 animate-pulse fill-red-400 border-none" />
              </div>
              <h3 className="text-3xl font-serif font-bold">{t("donate.title")}</h3>
            </div>

            <div className="space-y-8">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-maroon/40 mb-4 block">Select Amount (₹)</label>
                <div className="grid grid-cols-3 gap-3">
                  {AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(amt)}
                      className={`py-4 rounded-xl font-bold transition-all ${
                        selectedAmount === amt 
                        ? "bg-maroon text-white shadow-lg scale-105" 
                        : "bg-white text-maroon hover:bg-white/80 border border-maroon/10"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                  <input 
                    type="number" 
                    placeholder="Custom"
                    className="bg-white px-4 py-4 rounded-xl border border-maroon/10 focus:ring-2 focus:ring-saffron focus:border-transparent outline-none font-bold placeholder:text-maroon/30"
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <input 
                   className="bg-white p-4 rounded-xl border border-maroon/10 outline-none" 
                   placeholder="Full Name" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                 />
                 <input 
                   className="bg-white p-4 rounded-xl border border-maroon/10 outline-none" 
                   placeholder="Mobile Number" 
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                 />
              </div>

              {panRequired && (
                <input 
                  className="bg-white w-full p-4 rounded-xl border border-maroon/10 outline-none" 
                  placeholder="PAN Card Number" 
                  value={formData.pan}
                  onChange={(e) => setFormData({...formData, pan: e.target.value})}
                />
              )}

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={isAnonymous} 
                    onChange={() => setIsAnonymous(!isAnonymous)} 
                    className="w-5 h-5 accent-maroon"
                  />
                  <span className="text-sm font-medium text-maroon/60 group-hover:text-maroon transition-colors">{t("donate.anonymous")}</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={panRequired} 
                    onChange={() => setPanRequired(!panRequired)} 
                    className="w-5 h-5 accent-maroon"
                  />
                  <span className="text-sm font-medium text-maroon/60 group-hover:text-maroon transition-colors">{t("donate.pan_required")}</span>
                </label>
              </div>

              <button 
                onClick={handleDonate}
                disabled={loading}
                className="w-full bg-saffron hover:bg-maroon text-white p-6 rounded-2xl font-bold text-xl shadow-2xl flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 {loading ? "Processing..." : t("donate.cta")}
                 <CreditCard className="w-6 h-6" />
              </button>

              <div className="mt-8 pt-8 border-t border-maroon/10">
                <p className="text-center text-sm font-bold uppercase tracking-widest text-maroon/40 mb-6">Or Direct Payment Options</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-maroon/10 shadow-inner group">
                    <Image src="/assets/images/payment_info_1.jpg" alt="Payment Option 1" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-maroon/10 shadow-inner group">
                    <Image src="/assets/images/payment_info_2.jpg" alt="Payment Option 2" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

