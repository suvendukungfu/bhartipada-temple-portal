"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-saffron via-orange-500 to-maroon py-20 px-4">
      {/* Background with spiritual pattern or gradient placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-b from-transparent to-sandstone" />
        {/* Placeholder for temple background image */}
        <div 
          className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-50"
          style={{ backgroundImage: 'url("/assets/images/hero_bg.png")' }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container relative z-10 mx-auto text-center text-white">
        <FadeIn direction="none" delay={0.2}>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-2xl">
            <span className="text-4xl md:text-5xl font-serif font-bold text-white drop-shadow-lg">ॐ</span>
          </div>
        </FadeIn>

        <FadeIn direction="up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight drop-shadow-lg">
            {t("hero.title")}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white mb-10 font-medium leading-relaxed drop-shadow-md">
            {t("hero.subtitle")}
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link 
            href="/donate" 
            className="group flex items-center gap-3 px-8 py-4 bg-saffron text-white rounded-full font-bold text-lg transition-all hover:bg-white hover:text-saffron shadow-xl shadow-saffron/20"
          >
            <Heart className="w-5 h-5 fill-current" />
            {t("hero.cta_donate")}
          </Link>
          <Link 
            href="#history" 
            className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg transition-all hover:bg-white/20"
          >
            {t("hero.cta_explore")}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-saffron/40 blur-sm animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-6 h-6 rounded-full bg-temple-gold/40 blur-md animate-pulse delay-1000" />
    </section>
  );
}
