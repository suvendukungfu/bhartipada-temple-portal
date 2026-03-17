"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { TransparentDonorList } from "@/components/donate/TransparentDonorList";
import Script from "next/script";
import { Heart, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

declare global {
  interface Window {
    Razorpay: new (options: object) => { open: () => void };
  }
}

export default function DonatePage() {
  const { t } = useLanguage();
  const [amount, setAmount] = useState<number>(1100);
  const [purpose, setPurpose] = useState<string>("General Donation");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    birthdate: "",
    message: "",
    pan: "",
    is_anonymous: false
  });

  const PRESET_AMOUNTS = [501, 1100, 2100, 5100, 11000];
  const NEEDS = [
    { key: "needs.general", label: t("needs.general") },
    { key: "needs.flooring", label: t("needs.flooring") },
    { key: "needs.lighting", label: t("needs.lighting") },
    { key: "needs.gates", label: t("needs.gates") },
    { key: "needs.water", label: t("needs.water") },
    { key: "needs.festival", label: t("needs.festival") }
  ];

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return alert("Please enter a valid amount");

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "rzp_test_dummykey",
      amount: amount * 100,
      currency: "INR",
      name: "Bhartipada Temple",
      description: `Donation for ${purpose}`,
      image: "https://your-temple-logo-url.png",
      handler: function (response: { razorpay_payment_id: string }) {
        alert(`Payment successful! ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#f97316" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="pt-24 pb-12 bg-maroon text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-20"
          style={{ backgroundImage: 'url("/assets/images/hero_bg.png")' }}
        />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
          <Heart className="w-12 h-12 text-saffron mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("donate.title")}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {t("donate.subtitle")}
          </p>
        </div>
      </div>

      <div className="py-16 bg-sandstone">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <FadeIn direction="up" className="lg:col-span-8 bg-white rounded-2xl shadow-2xl overflow-hidden border border-maroon/10">
              <div className="p-8 border-b border-sandstone">
                <h2 className="text-2xl font-serif font-bold text-maroon mb-2 flex items-center gap-2">
                  {t("donate.form_title")}
                </h2>
                <p className="text-foreground/70">{t("donate.form_subtitle")}</p>
              </div>

              <form onSubmit={handleProcessPayment} className="p-8 space-y-8">
                
                <div className="space-y-6">
                  <h3 className="font-bold text-lg border-b border-maroon/10 pb-2">{t("donate.label_amount_step")}</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-3">{t("donate.label_choose_amount")}</label>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {PRESET_AMOUNTS.map(amt => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAmount(amt)}
                          className={`px-6 py-3 rounded-full font-bold transition-all ${
                            amount === amt 
                            ? 'bg-saffron text-white shadow-md shadow-saffron/30 scale-105' 
                            : 'bg-sandstone text-foreground/80 hover:bg-saffron/10'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center">
                      <span className="bg-sandstone px-4 py-3 rounded-l-lg border border-r-0 border-maroon/20 font-bold text-foreground/70">₹</span>
                      <input 
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full max-w-xs border border-maroon/20 rounded-r-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/50 transition-shadow"
                        placeholder="Custom Amount"
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-2">{t("donate.label_purpose")}</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {NEEDS.map(need => (
                        <label 
                          key={need.key} 
                          className={`cursor-pointer border rounded-lg p-3 transition-all ${purpose === need.label ? 'border-saffron bg-saffron/5' : 'border-maroon/10 hover:border-saffron/50'}`}
                        >
                          <div className="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="purpose" 
                              value={need.label} 
                              checked={purpose === need.label}
                              onChange={() => setPurpose(need.label)}
                              className="text-saffron focus:ring-saffron"
                            />
                            <span className="text-sm font-medium">{need.label}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-bold text-lg border-b border-maroon/10 pb-2">{t("donate.label_details_step")}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1">{t("donate.label_name")} *</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-maroon/20 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-saffron/50" 
                        placeholder="Sri Ram" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1">{t("donate.label_email")}</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-maroon/20 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-saffron/50" 
                        placeholder="devotee@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1">{t("donate.label_phone")} *</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-maroon/20 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-saffron/50" 
                        placeholder="+91 99999 99999" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1">{t("donate.label_pan")}</label>
                      <input 
                        type="text" 
                        value={formData.pan}
                        onChange={e => setFormData({...formData, pan: e.target.value})}
                        className="w-full border border-maroon/20 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-saffron/50" 
                        placeholder="ABCDE1234F" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1">{t("donate.label_message")}</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full border border-maroon/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron/50 resize-none" 
                      placeholder={t("donate.placeholder_message")}
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-sandstone p-4 rounded-lg">
                    <input 
                      type="checkbox" 
                      id="anon"
                      checked={formData.is_anonymous}
                      onChange={e => setFormData({...formData, is_anonymous: e.target.checked})}
                      className="w-5 h-5 text-saffron rounded focus:ring-saffron"
                    />
                    <label htmlFor="anon" className="text-sm text-foreground/80">{t("donate.label_anonymous")}</label>
                  </div>
                </div>

                <div className="pt-6 border-t border-maroon/10">
                  <button 
                    type="submit"
                    className="w-full bg-saffron hover:bg-saffron/90 text-white py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-saffron/20 flex flex-col items-center justify-center gap-1 group"
                  >
                    <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> {t("donate.btn_pay")} ₹{amount.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-normal text-white/80 group-hover:text-white transition-colors">{t("donate.btn_secure_note")}</span>
                  </button>
                </div>
              </form>
            </FadeIn>

            <div className="lg:col-span-4 space-y-8">
              <FadeIn direction="left" delay={0.2}>
                <TransparentDonorList />
              </FadeIn>

              <FadeIn direction="left" delay={0.4} className="bg-maroon text-white p-8 rounded-2xl shadow-xl">
                <h3 className="font-serif font-bold text-xl mb-4 text-temple-gold">{t("needs.why_title")}</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {t("needs.why_desc")}
                </p>
                <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                  <span className="text-sm text-white/60">{t("needs.tax_exempt")}</span>
                  <span className="font-bold text-sm text-temple-gold">{t("needs.certified")}</span>
                </div>
              </FadeIn>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
