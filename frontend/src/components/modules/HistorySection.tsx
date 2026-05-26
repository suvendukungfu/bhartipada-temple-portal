"use client";

import React, { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Clock, History, Landmark, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const TIMELINE = [
  {
    id: "origins",
    year: "1400s",
    era: "Gajapati Era",
    icon: Landmark,
    image: "/assets/images/carving_1.jpg",
    bgImage: "/assets/images/history_1.png",
    color: "from-amber-900/80 to-amber-950/90",
    accentColor: "bg-amber-500",
  },
  {
    id: "royal",
    year: "1750",
    era: "Maratha Period",
    icon: Clock,
    image: "/assets/images/carving_2.jpg",
    bgImage: "/assets/images/carving_3.jpg",
    color: "from-rose-900/80 to-rose-950/90",
    accentColor: "bg-rose-500",
  },
  {
    id: "cultural",
    year: "1940",
    era: "Colonial Revival",
    icon: History,
    image: "/assets/images/carving_4.jpg",
    bgImage: "/assets/images/carving_5.jpg",
    color: "from-emerald-900/80 to-emerald-950/90",
    accentColor: "bg-emerald-500",
  },
  {
    id: "digital",
    year: "2024",
    era: "Modern Renaissance",
    icon: Sparkles,
    image: "/assets/images/history_4.png",
    bgImage: "/assets/images/carving_6.jpg",
    color: "from-violet-900/80 to-violet-950/90",
    accentColor: "bg-violet-500",
  },
];

export function HistorySection() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = TIMELINE[activeIndex];

  return (
    <section id="history" className="relative py-0 overflow-hidden bg-[#0a0604]">
      {/* === FULL-BLEED BACKGROUND IMAGE WITH TRANSITION === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${activeEvent.id}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={activeEvent.bgImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
          />
          <div className={`absolute inset-0 bg-linear-to-r ${activeEvent.color}`} />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0604] via-[#0a0604]/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-[#0a0604] via-transparent to-transparent h-32" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">

          {/* === SECTION HEADER === */}
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-saffron text-[10px] font-black tracking-[0.4em] uppercase mb-6 backdrop-blur-md">
              <History className="w-3.5 h-3.5" />
              Six Centuries of Devotion
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
              {t("history.title")}
            </h2>
            <p className="max-w-xl mx-auto text-sandstone/50 font-sans text-base">
              Witness the divine evolution of Bhartipada Temple through six centuries of unwavering devotion.
            </p>
          </FadeIn>

          {/* === MAIN CONTENT GRID === */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* LEFT: TIMELINE VERTICAL NAVIGATION */}
            <div className="lg:col-span-4 xl:col-span-3">
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[27px] top-4 bottom-4 w-px bg-white/10" />

                {/* Active progress indicator */}
                <motion.div
                  className="absolute left-[27px] top-4 w-px bg-saffron"
                  animate={{ height: `${((activeIndex + 1) / TIMELINE.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                <div className="space-y-3">
                  {TIMELINE.map((item, index) => {
                    const isActive = activeIndex === index;
                    const isPast = index < activeIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                        className={`group w-full flex items-start gap-5 p-5 rounded-2xl transition-all duration-500 relative cursor-pointer ${
                          isActive
                            ? "bg-white/10 backdrop-blur-xl border border-white/15 shadow-2xl shadow-saffron/5"
                            : "bg-transparent border border-transparent hover:bg-white/5 hover:border-white/5"
                        }`}
                      >
                        {/* Timeline dot */}
                        <div className={`relative z-10 shrink-0 w-[14px] h-[14px] rounded-full border-2 mt-1 transition-all duration-300 ${
                          isActive
                            ? "bg-saffron border-saffron shadow-[0_0_12px_rgba(255,153,51,0.6)]"
                            : isPast
                              ? "bg-saffron/60 border-saffron/60"
                              : "bg-transparent border-white/30 group-hover:border-white/50"
                        }`}>
                          {isActive && (
                            <span className="absolute -inset-1.5 rounded-full bg-saffron/20 animate-ping" />
                          )}
                        </div>

                        <div className="text-left flex-1 min-w-0">
                          <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 transition-colors ${
                            isActive ? "text-saffron" : isPast ? "text-saffron/50" : "text-white/30"
                          }`}>
                            {item.year} · {item.era}
                          </div>
                          <div className={`font-serif font-bold text-lg transition-colors ${
                            isActive ? "text-white" : "text-white/50 group-hover:text-white/70"
                          }`}>
                            {t(`history.events.${item.id}.title`)}
                          </div>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="text-sm text-sandstone/50 leading-relaxed mt-2 font-sans"
                            >
                              {t(`history.events.${item.id}.desc`)}
                            </motion.p>
                          )}
                        </div>

                        {isActive && (
                          <ChevronRight className="w-5 h-5 text-saffron mt-1 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT: IMMERSIVE IMAGE & DETAIL CARD */}
            <div className="lg:col-span-8 xl:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  {/* Main Feature Image */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden group">
                    <Image
                      src={activeEvent.image}
                      alt={t(`history.events.${activeEvent.id}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      quality={85}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                    {/* Floating year badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl">
                      <span className="text-saffron font-black text-xl font-serif">{activeEvent.year}</span>
                    </div>

                    {/* Bottom caption overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-lg">
                        {t(`history.events.${activeEvent.id}.title`)}
                      </h3>
                      <p className="text-base md:text-lg text-sandstone/80 leading-relaxed font-sans max-w-2xl drop-shadow-md">
                        {t(`history.events.${activeEvent.id}.desc`)}
                      </p>
                    </div>
                  </div>

                  {/* Architectural Details Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Style", value: "Kalinga Deula" },
                      { label: "Material", value: "Laterite & Sandstone" },
                      { label: "Architect", value: "Pradeep Sachdeva" },
                      { label: "Status", value: activeIndex === 3 ? "In Progress" : "Heritage" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <div className="text-[10px] font-black uppercase tracking-widest text-saffron/60 mb-1">{stat.label}</div>
                        <div className="text-sm font-bold text-white">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* === BLUEPRINT BAR (Architectural Strip from PDF) === */}
          <FadeIn delay={0.3}>
            <div className="mt-20 relative rounded-3xl overflow-hidden group cursor-pointer">
              <div className="relative h-48 md:h-64">
                <Image
                  src="/assets/images/pdf_page_2.png"
                  alt="Temple Blueprint – Floor Plan & Elevation by Pradeep Sachdeva Design Associates"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#0a0604]/90 via-[#0a0604]/40 to-[#0a0604]/90" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0604] via-transparent to-[#0a0604]/50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-saffron/60 mb-2">Official Architectural Blueprint</div>
                  <div className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">35&apos; × 19&apos; Kalinga-Style Vimana</div>
                  <div className="text-sm text-sandstone/50 font-sans">Pradeep Sachdeva Design Associates · Scale 1&quot;=4&apos;-0&quot;</div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
