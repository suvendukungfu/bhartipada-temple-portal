"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Monitor, Smartphone, Glasses } from "lucide-react";

export function VRSection() {
  const { t } = useLanguage();

  return (
    <section id="vr-tour" className="py-24 bg-maroon text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-saffron/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-full mb-6">
            <Glasses className="w-10 h-10 text-saffron" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {t("virtual_tour.title")}
          </h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-white/80">
            {t("virtual_tour.subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right" className="relative aspect-video rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl group">
             <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: 'url("/assets/images/gallery_4.png")' }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <div className="w-20 h-20 bg-saffron rounded-full flex items-center justify-center animate-pulse cursor-pointer shadow-xl shadow-saffron/20 group-hover:scale-110 transition-transform">
                   <div className="w-0 h-0 border-t-10 border-t-transparent border-l-18 border-l-white border-b-10 border-b-transparent ml-2" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 bg-maroon/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                  <span className="text-temple-gold font-bold text-sm tracking-widest uppercase">{t("virtual_tour.panorama_label")}</span>
              </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn direction="left" delay={0.2} className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
               <div className="bg-saffron/20 p-3 rounded-xl shrink-0">
                  <Monitor className="w-8 h-8 text-saffron" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-2">{t("virtual_tour.cta_vr")}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t("virtual_tour.vr_desc")}
                  </p>
               </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.4} className="flex gap-6 items-start bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
               <div className="bg-saffron/20 p-3 rounded-xl shrink-0">
                  <Smartphone className="w-8 h-8 text-saffron" />
               </div>
               <div>
                  <h3 className="text-xl font-bold mb-2">{t("virtual_tour.cta_ar")}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t("virtual_tour.ar_desc")}
                  </p>
               </div>
            </FadeIn>

            <div className="pt-4 px-6 italic text-sm text-temple-gold/80 flex items-center gap-2">
                <div className="w-2 h-2 bg-temple-gold rounded-full animate-ping" />
                {t("virtual_tour.note")}
            </div>

            <div className="flex flex-wrap gap-4 px-6">
                <button className="bg-saffron hover:bg-saffron/90 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-saffron/20 transition-all active:scale-95">
                    {t("virtual_tour.cta_vr")}
                </button>
                <button className="bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-xl font-bold transition-all active:scale-95">
                    {t("virtual_tour.cta_ar")}
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
