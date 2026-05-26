"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { ArrowRight, Sparkles, ChevronDown, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function HeroSection() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.85]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* === 1. PARALLAX BACKGROUND IMAGE from PDF === */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/assets/images/temple_render_v2.jpeg"
          alt="Bhartipada Temple – 3D Architectural Render by Pradeep Sachdeva Design Associates"
          fill
          priority
          className="object-cover object-center scale-110"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* === 2. CINEMATIC GRADIENT OVERLAYS === */}
      {/* Bottom-to-top dark vignette */}
      <div className="absolute inset-0 z-1 bg-linear-to-t from-black via-black/70 to-transparent" />
      {/* Top fade for nav blending */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-black/60 via-transparent to-transparent" />
      {/* Side vignettes for cinematic look */}
      <div className="absolute inset-0 z-1 bg-linear-to-r from-black/40 via-transparent to-black/40" />
      {/* Warm saffron glow from bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-saffron/8 blur-[160px] rounded-full z-1" />

      {/* === 3. ANIMATED FLOATING PARTICLES === */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-saffron/30 rounded-full"
            style={{
              left: `${5 + (i * 4.7) % 90}%`,
              top: `${10 + (i * 7.3) % 80}%`,
            }}
            animate={{
              y: [0, -60 - (i * 3), 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* === 4. MAIN CONTENT === */}
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-10 pt-24 pb-32"
      >
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-saffron text-xs font-black tracking-[0.4em] uppercase mb-10 backdrop-blur-xl shadow-[0_0_30px_rgba(255,153,51,0.1)]">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Digital Sanctuary
            </div>
          </FadeIn>

          {/* Title */}
          <FadeIn delay={0.2}>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-serif font-bold text-white mb-6 tracking-tighter leading-[0.85] drop-shadow-[0_4px_40px_rgba(0,0,0,0.8)]">
              {t("hero.title")}
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={0.4}>
            <p className="max-w-2xl text-lg md:text-xl text-sandstone/70 font-sans mb-12 leading-relaxed tracking-wide drop-shadow-lg">
              {t("hero.subtitle")}
            </p>
          </FadeIn>

          {/* Development Phase Alert Card */}
          <FadeIn delay={0.5}>
            <div className="max-w-3xl mx-auto mb-14 rounded-3xl relative overflow-hidden">
              {/* Card glass background */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl" />

              {/* Animated border gradient */}
              <div className="absolute inset-0 rounded-3xl p-px overflow-hidden">
                <div className="absolute -inset-1 bg-linear-to-r from-saffron/0 via-saffron/40 to-saffron/0 animate-gradient-x rounded-3xl" />
              </div>

              <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
                {/* Left accent bar */}
                <div className="hidden md:block absolute top-4 left-0 w-1 h-[calc(100%-32px)] bg-linear-to-b from-saffron via-temple-gold to-saffron/30 rounded-full" />

                <div className="flex-1 space-y-3 md:pl-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-saffron">
                      {t("hero.dev_alert_title")}
                    </span>
                  </div>

                  <p className="text-sm text-sandstone/70 leading-relaxed font-sans">
                    {t("hero.dev_alert_desc")}
                  </p>
                </div>

                <div className="shrink-0 w-full md:w-auto">
                  <a
                    href="/assets/temple-drawings.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-saffron/40 hover:border-saffron hover:bg-saffron/15 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 whitespace-nowrap bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,153,51,0.1)] hover:shadow-[0_0_30px_rgba(255,153,51,0.25)]"
                  >
                    <FileText className="w-4 h-4 text-saffron" />
                    {t("hero.dev_alert_cta")}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.6} className="flex flex-col sm:flex-row items-center gap-5">
            <Link
              href="#donate"
              className="group relative bg-linear-to-r from-saffron to-temple-gold text-maroon hover:from-temple-gold hover:to-saffron px-10 py-4 rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(255,153,51,0.3)] hover:shadow-[0_0_60px_rgba(255,153,51,0.5)] transition-all flex items-center gap-3 overflow-hidden active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {t("hero.cta_donate")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#history"
              className="group bg-white/5 backdrop-blur-md border border-white/15 text-white hover:bg-white/10 hover:border-white/25 px-10 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 active:scale-95"
            >
              {t("hero.cta_explore")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform opacity-60" />
            </Link>
          </FadeIn>
        </div>
      </motion.div>

      {/* === 5. SCROLL INDICATOR === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/60 vertical-text">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-saffron" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 300% 100%;
          animation: gradient-x 4s ease infinite;
        }
      `}</style>
    </section>
  );
}
