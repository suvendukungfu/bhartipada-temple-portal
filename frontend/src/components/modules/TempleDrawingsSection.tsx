"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { 
  Compass, 
  Sparkles, 
  Grid3X3, 
  Bell, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  BookOpen, 
  Info,
  Maximize2
} from "lucide-react";

type ThemeMode = "golden" | "blueprint";
type TempleKey = "konark" | "jagannath" | "mukteshwar" | "bhartipada";
type HotspotKey = "kalasa" | "amalaka" | "shikhara" | "jagamohana" | "garbhagriha" | "torana";

interface Hotspot {
  key: HotspotKey;
  x: number; // percentage from left
  y: number; // percentage from top
}

export function TempleDrawingsSection() {
  const { t, lang } = useLanguage();
  const [selectedTemple, setSelectedTemple] = useState<TempleKey>("jagannath");
  const [themeMode, setThemeMode] = useState<ThemeMode>("golden");
  const [activeHotspot, setActiveHotspot] = useState<HotspotKey | null>("shikhara");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [triggerDraw, setTriggerDraw] = useState(0);

  // Programmatic Web Audio Synthesizer for Temple Bell Chime
  const playBellSound = () => {
    if (!soundEnabled || typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;

      // 1. Bell Clapper Attack & Resonance (fundamental at 659.25 Hz - E5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.4, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3);

      // 2. High metallic chime overtone (inharmonics for realistic metal chime)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1050, now);
      gain2.gain.setValueAtTime(0.18, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      // 3. Higher overtone (combining for pure bell timbre)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = "sine";
      osc3.frequency.setValueAtTime(1318.5, now); // Sweet E6 octave
      gain3.gain.setValueAtTime(0.12, now);
      gain3.gain.exponentialRampToValueAtTime(0.0001, now + 2);

      // 4. Low resonant hum (dhwani) - G3/C4 body warmth
      const osc4 = ctx.createOscillator();
      const gain4 = ctx.createGain();
      osc4.type = "triangle";
      osc4.frequency.setValueAtTime(261.63, now); // C4
      gain4.gain.setValueAtTime(0.15, now);
      gain4.gain.exponentialRampToValueAtTime(0.0001, now + 4);

      // Connections
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);
      osc4.connect(gain4);

      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);
      gain3.connect(ctx.destination);
      gain4.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc3.start(now);
      osc4.start(now);

      osc1.stop(now + 3);
      osc2.stop(now + 1.2);
      osc3.stop(now + 2);
      osc4.stop(now + 4);
    } catch (err) {
      console.warn("Web Audio failed or was blocked by browser autoplay policy.", err);
    }
  };

  const handleHotspotClick = (key: HotspotKey) => {
    setActiveHotspot(key);
    playBellSound();
  };

  const handleTempleChange = (key: TempleKey) => {
    setSelectedTemple(key);
    setTriggerDraw(prev => prev + 1);
    // Set matching initial hotspot based on temple selected
    if (key === "konark") {
      setActiveHotspot("amalaka");
    } else if (key === "mukteshwar") {
      setActiveHotspot("torana");
    } else if (key === "bhartipada") {
      setActiveHotspot("garbhagriha");
    } else {
      setActiveHotspot("shikhara");
    }
  };

  // Hotspot placements for each temple drawing
  const hotspotsMap: Record<TempleKey, Hotspot[]> = {
    jagannath: [
      { key: "kalasa", x: 50, y: 8 },
      { key: "amalaka", x: 50, y: 15 },
      { key: "shikhara", x: 50, y: 35 },
      { key: "jagamohana", x: 74, y: 65 },
      { key: "garbhagriha", x: 38, y: 70 }
    ],
    konark: [
      { key: "amalaka", x: 50, y: 50 }, // Central axle
      { key: "shikhara", x: 50, y: 22 }, // Top spoke vertical
      { key: "jagamohana", x: 70, y: 30 }, // Spoke 45deg
      { key: "torana", x: 90, y: 50 } // Outer rim
    ],
    mukteshwar: [
      { key: "torana", x: 50, y: 56 }, // The famous arch
      { key: "shikhara", x: 50, y: 25 }, // The Shikhara in background
      { key: "kalasa", x: 50, y: 12 }, // Spire crown
      { key: "garbhagriha", x: 34, y: 40 } // Pillar details
    ],
    bhartipada: [
      { key: "kalasa", x: 42, y: 10 },
      { key: "shikhara", x: 42, y: 38 },
      { key: "jagamohana", x: 75, y: 62 },
      { key: "garbhagriha", x: 42, y: 78 }
    ]
  };

  return (
    <section id="temple-drawings" className="py-28 relative overflow-hidden bg-[#0d0907] transition-all duration-1000">
      {/* 1. Dynamic Decorative Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {themeMode === "blueprint" ? (
          // Tech Blueprint Grid Overlay
          <div className="absolute inset-0 animate-pulse-slow" 
               style={{
                 backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.08) 1px, transparent 1px), 
                                   linear-gradient(90deg, rgba(14, 165, 233, 0.08) 1px, transparent 1px)`,
                 backgroundSize: "28px 28px",
                 backgroundPosition: "center center"
               }} 
          />
        ) : (
          // Sacred Mandala & Aura
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[800px] h-[800px] border border-saffron/10 rounded-full opacity-30 animate-spin-slow" />
            <div className="w-[600px] h-[600px] border border-dashed border-temple-gold/15 rounded-full absolute animate-spin-reverse" />
            <div className="w-[1000px] h-[1000px] bg-linear-to-r from-maroon/0 via-saffron/5 to-maroon/0 rounded-full blur-[140px] absolute" />
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* 2. Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-saffron text-xs font-bold tracking-[0.3em] uppercase mb-4 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-temple-gold animate-spin-slow" />
              Kalinga Vastu Vidya
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
              {t("drawings.title")}
            </h2>
            <p className="mt-4 max-w-2xl text-sandstone/60 text-base md:text-lg leading-relaxed">
              {t("drawings.subtitle")}
            </p>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Audio Toggle */}
            <button 
              onClick={() => { setSoundEnabled(!soundEnabled); playBellSound(); }}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                soundEnabled 
                  ? "bg-saffron/20 border-saffron/40 text-saffron shadow-[0_0_15px_rgba(255,153,51,0.15)]" 
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white"
              }`}
              title={soundEnabled ? "Mute Bell Sound" : "Enable Bell Sound"}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            {/* Redraw button */}
            <button 
              onClick={() => { setTriggerDraw(p => p + 1); playBellSound(); }}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              title="Re-draw Sketch"
            >
              <RotateCcw className="w-5 h-5 animate-hover-spin" />
            </button>

            {/* Style Toggles */}
            <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex gap-1 backdrop-blur-md">
              <button
                onClick={() => { setThemeMode("golden"); playBellSound(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  themeMode === "golden"
                    ? "bg-saffron text-white shadow-lg"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t("drawings.view_golden")}
              </button>
              <button
                onClick={() => { setThemeMode("blueprint"); playBellSound(); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  themeMode === "blueprint"
                    ? "bg-sky-600 text-white shadow-lg shadow-sky-600/20"
                    : "text-white/60 hover:text-white"
                }`}
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                {t("drawings.view_blueprint")}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-stretch">
          
          {/* A. Left Sidebar: Temple Selector & Vastu Quotations */}
          <div className="xl:col-span-3 flex flex-col justify-between gap-8 order-2 xl:order-1">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block mb-2">
                {t("drawings.temple_select")}
              </span>
              
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-3">
                {[
                  { id: "jagannath", name: t("drawings.temple_spire"), desc: "Puri • 12th Century" },
                  { id: "konark", name: t("drawings.temple_wheel"), desc: "Konark • 13th Century" },
                  { id: "mukteshwar", name: t("drawings.temple_torana"), desc: "Bhubaneswar • 10th Century" },
                  { id: "bhartipada", name: t("drawings.temple_elevation"), desc: "Bhartipada • Modern Kalinga" }
                ].map(tItem => (
                  <button
                    key={tItem.id}
                    onClick={() => handleTempleChange(tItem.id as TempleKey)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 group cursor-pointer ${
                      selectedTemple === tItem.id
                        ? themeMode === "blueprint"
                          ? "bg-sky-950/40 border-sky-500 text-white shadow-[0_0_20px_rgba(14,165,233,0.15)]"
                          : "bg-saffron/10 border-saffron text-white shadow-[0_0_20px_rgba(255,153,51,0.15)]"
                        : "bg-white/2 border-white/5 text-white/70 hover:bg-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="font-serif font-black text-base group-hover:text-saffron transition-colors">
                      {tItem.name}
                    </div>
                    <div className="text-xs text-white/40 mt-1">{tItem.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sacred Vastu Shastra Wisdom Quote */}
            <div className="relative p-6 rounded-2xl bg-white/2 border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/5 rounded-full blur-2xl pointer-events-none" />
              <BookOpen className="w-6 h-6 text-saffron mb-4" />
              
              <div className="font-serif italic text-sandstone/80 text-sm leading-relaxed mb-4">
                {lang === "or" ? (
                  "\"ପ୍ରାସାଦଂ ୟଦ୍ଵିଧାନେନ ମାନସୂତ୍ରେଣ ଲକ୍ଷିତମ୍ । ସର୍ବଲକ୍ଷଣସମ୍ପନ୍ନଂ ଧର୍ମକାମାର୍ଥମୋକ୍ଷଦମ୍ ॥\""
                ) : lang === "hi" ? (
                  "\"प्रासादं यद्विधानेन मानसूत्रेण लक्षितम्। सर्वलक्षणसम्पन्नं धर्मकामार्थमोक्षदम्॥\""
                ) : (
                  "\"The temple, built according to sacred proportions and structural measurements, endowed with all divine attributes, grants righteousness, prosperity, fulfillment, and liberation.\""
                )}
              </div>
              <div className="text-[10px] font-bold tracking-widest text-saffron uppercase">
                — Silpa Prakasa • Kalinga Architecture Canon
              </div>
            </div>
          </div>

          {/* B. Center Panel: The Interactive Drawing Canvas */}
          <div className="xl:col-span-6 order-1 xl:order-2 flex flex-col items-center">
            
            {/* The Drawing Velvet Board */}
            <div className={`relative w-full aspect-square md:aspect-[4/5] xl:aspect-[3/4] max-h-[640px] rounded-3xl border overflow-hidden flex items-center justify-center transition-all duration-700 ${
              themeMode === "blueprint"
                ? "bg-[#0b1329] border-sky-500/20 shadow-[inset_0_0_80px_rgba(14,165,233,0.1)]"
                : "bg-[#0a0705] border-saffron/10 shadow-[inset_0_0_80px_rgba(255,153,51,0.05)]"
            }`}>
              
              {/* Technical Blueprint Measurement Lines (Only in blueprint mode) */}
              {themeMode === "blueprint" && (
                <div className="absolute inset-0 z-0 pointer-events-none p-6 font-mono text-[9px] text-sky-400/30 flex flex-col justify-between">
                  <div className="flex justify-between border-b border-sky-500/10 pb-1">
                    <span>SECTOR: KALINGA_ZONAL</span>
                    <span>SCALE: 1:120</span>
                  </div>
                  
                  {/* Axis crosshair */}
                  <div className="absolute top-1/2 left-4 right-4 border-t border-dashed border-sky-500/5 -translate-y-1/2" />
                  <div className="absolute left-1/2 top-4 bottom-4 border-l border-dashed border-sky-500/5 -translate-x-1/2" />
                  
                  {/* Measurement labels */}
                  <div className="absolute left-6 top-1/3 flex flex-col gap-1">
                    <span className="text-[8px] bg-[#0b1329] px-1 border border-sky-500/10">BADA_AXIS: 90°</span>
                    <span className="text-[8px] bg-[#0b1329] px-1 border border-sky-500/10">PITHA_DEPTH: 8.4m</span>
                  </div>

                  <div className="flex justify-between border-t border-sky-500/10 pt-1">
                    <span>COORDS: 20.2961° N, 85.8189° E</span>
                    <span>CAD_BUILD: R3_REV</span>
                  </div>
                </div>
              )}

              {/* Floating Celestial Sanskrit Texts in Background (Only in Golden mode) */}
              {themeMode === "golden" && (
                <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.03]">
                  <div className="font-serif text-[4vw] text-saffron leading-none text-center rotate-45 tracking-widest leading-loose">
                    <div>ॐ नमः शिवाय</div>
                    <div>ॐ श्री जगन्नाथाय नमः</div>
                    <div>मन्दिरं देवसदनं कलिङ्ग शिल्प शिल्पकार</div>
                  </div>
                </div>
              )}

              {/* Dynamic Drawing Renderer */}
              <div className="absolute w-[90%] h-[90%] z-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedTemple}-${triggerDraw}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full relative"
                  >
                    {/* Render the drawing SVG */}
                    {selectedTemple === "jagannath" && (
                      <JagannathSpireSVG theme={themeMode} activePart={activeHotspot} />
                    )}
                    {selectedTemple === "konark" && (
                      <KonarkWheelSVG theme={themeMode} activePart={activeHotspot} />
                    )}
                    {selectedTemple === "mukteshwar" && (
                      <MukteshwarToranaSVG theme={themeMode} activePart={activeHotspot} />
                    )}
                    {selectedTemple === "bhartipada" && (
                      <BhartipadaTempleSVG theme={themeMode} activePart={activeHotspot} />
                    )}

                    {/* Interactive Hotspots Overlay */}
                    {hotspotsMap[selectedTemple]?.map((spot) => {
                      const isActive = activeHotspot === spot.key;
                      return (
                        <button
                          key={spot.key}
                          onClick={() => handleHotspotClick(spot.key)}
                          className="absolute z-30 group cursor-pointer focus:outline-none"
                          style={{ left: `${spot.x}%`, top: `${spot.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                          {/* Outer pulse wave */}
                          <div className={`absolute -inset-4 rounded-full transition-all duration-300 ${
                            isActive 
                              ? themeMode === "blueprint"
                                ? "bg-sky-500/20 animate-ping"
                                : "bg-saffron/20 animate-ping"
                              : "bg-transparent group-hover:bg-white/5 scale-75 group-hover:scale-100"
                          }`} />

                          {/* Glow halo */}
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur-xs transition-all duration-500 ${
                            isActive
                              ? themeMode === "blueprint"
                                ? "bg-sky-950/80 border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.8)] scale-110"
                                : "bg-saffron/30 border-temple-gold shadow-[0_0_20px_rgba(255,153,51,0.8)] scale-110"
                              : themeMode === "blueprint"
                                ? "bg-black/40 border-sky-500/30 text-sky-400 group-hover:border-sky-400 group-hover:text-white"
                                : "bg-black/40 border-saffron/30 text-saffron group-hover:border-saffron group-hover:text-white"
                          }`}>
                            <span className="text-[10px] font-black uppercase font-mono">
                              {spot.key[0].toUpperCase()}
                            </span>
                          </div>

                          {/* Quick Tooltip on Hover */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-[#0d0907]/90 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase text-white opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 whitespace-nowrap shadow-xl">
                            {t(`drawings.hotspots.${spot.key}.title`)}
                          </div>
                        </button>
                      );
                    })}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Instructions Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <Info className="w-3.5 h-3.5 text-saffron animate-bounce" />
                {t("drawings.interactive_label")}
              </div>
            </div>
          </div>

          {/* C. Right Panel: Dynamic Blueprint Detail Card */}
          <div className="xl:col-span-3 flex flex-col order-3">
            <div className={`h-full p-8 rounded-3xl border flex flex-col justify-between gap-6 transition-all duration-700 ${
              themeMode === "blueprint"
                ? "bg-[#0b1329]/50 border-sky-500/20 text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                : "bg-maroon/10 border-saffron/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            }`}>
              
              <AnimatePresence mode="wait">
                {activeHotspot ? (
                  <motion.div
                    key={activeHotspot}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-saffron mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-saffron rounded-full animate-pulse" />
                        {t(`drawings.hotspots.${activeHotspot}.subtitle`)}
                      </div>
                      <h3 className="text-3xl font-serif font-black tracking-tight leading-none text-white">
                        {t(`drawings.hotspots.${activeHotspot}.title`)}
                      </h3>
                    </div>

                    <div className="w-16 h-0.5 bg-saffron/30 rounded-full" />

                    <p className="text-sm leading-relaxed text-sandstone/70">
                      {t(`drawings.hotspots.${activeHotspot}.desc`)}
                    </p>

                    {/* Vastu Parameters (Technical Info) */}
                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <div className="flex justify-between text-xs py-1 border-b border-white/2">
                        <span className="text-white/40">Canonical Term:</span>
                        <span className="font-mono text-saffron font-bold">
                          {activeHotspot === "kalasa" && "କଳସ / Kalasa"}
                          {activeHotspot === "amalaka" && "ଅଁଳା / Āmalaka"}
                          {activeHotspot === "shikhara" && "ଶିଖର / Śikhara"}
                          {activeHotspot === "jagamohana" && "ଜଗମୋହନ / Jagamohana"}
                          {activeHotspot === "garbhagriha" && "ଗର୍ଭଗୃହ / Garbhagṛha"}
                          {activeHotspot === "torana" && "ତୋରଣ / Toraṇa"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs py-1 border-b border-white/2">
                        <span className="text-white/40">Vastu Element:</span>
                        <span className="text-sandstone font-medium">
                          {activeHotspot === "kalasa" && "Akasha (Ether / Cosmos)"}
                          {activeHotspot === "amalaka" && "Surya (Solar / Fire)"}
                          {activeHotspot === "shikhara" && "Prithvi (Earth / Mountain)"}
                          {activeHotspot === "jagamohana" && "Vayu (Wind / Gathering)"}
                          {activeHotspot === "garbhagriha" && "Agni (Divine Fire Core)"}
                          {activeHotspot === "torana" && "Jala (Water Transition)"}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs py-1">
                        <span className="text-white/40">Kalinga Style:</span>
                        <span className="text-sandstone font-medium">
                          {activeHotspot === "shikhara" ? "Rekha Deula" : "Classic Deula"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/40 p-4">
                    <Maximize2 className="w-10 h-10 mb-4 stroke-1 animate-pulse" />
                    <p className="text-xs uppercase tracking-widest font-black">
                      Select a hotspot circle on the temple sketch to explore Kalinga architecture
                    </p>
                  </div>
                )}
              </AnimatePresence>

              {/* Action Button */}
              <div className="pt-6 border-t border-white/5">
                <button 
                  onClick={playBellSound}
                  className="w-full group py-4 px-6 rounded-2xl bg-white/5 border border-white/10 hover:border-saffron hover:bg-saffron/10 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 active:scale-98"
                >
                  <Bell className="w-4 h-4 text-saffron group-hover:rotate-12 transition-transform duration-300" />
                  {t("drawings.bell_sound")}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ========================================================================= */
/* ================== SVGS FOR THE ARCHITECTURAL DRAWINGS ================== */
/* ========================================================================= */

interface SVGProps {
  theme: ThemeMode;
  activePart: HotspotKey | null;
}

// 1. PURI JAGANNATH TEMPLE SPIRE
function JagannathSpireSVG({ theme, activePart }: SVGProps) {
  const isB = theme === "blueprint";
  const strokeColor = isB ? "#0ea5e9" : "#ff9933";
  const activeColor = isB ? "#38bdf8" : "#ffd700";

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg" fill="none">
      {/* Dynamic Glow Filter */}
      <defs>
        <filter id="glow-spire" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={isB ? "4" : "6"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={activeColor} />
          <stop offset="100%" stopColor={strokeColor} />
        </linearGradient>
      </defs>

      {/* Blueprint Grid Guide Circles */}
      {isB && (
        <g opacity="0.15">
          <circle cx="200" cy="250" r="180" stroke="#0ea5e9" strokeDasharray="3,3" />
          <circle cx="200" cy="250" r="120" stroke="#0ea5e9" strokeDasharray="3,3" />
          <line x1="20" y1="250" x2="380" y2="250" stroke="#0ea5e9" strokeDasharray="2,2" />
        </g>
      )}

      {/* DRAWING PATHS */}
      <g stroke="url(#gradient-line)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow-spire)">
        
        {/* A. FLAG (Patitapabana) */}
        <motion.path 
          d="M 200 45 L 225 38 C 235 34, 230 46, 242 42 L 242 50 C 230 52, 232 42, 222 46 L 200 52"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          className="flag-line"
          strokeWidth="1.2"
        />
        
        {/* B. KALASA (Golden Pitcher) */}
        <motion.path 
          d="M 194 65 Q 192 53, 200 50 Q 208 53, 206 65 Q 200 68, 194 65 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
          strokeWidth={activePart === "kalasa" ? "2.5" : "1.5"}
        />

        {/* C. NILACHAKRA (Discus on top) */}
        <motion.circle 
          cx="200" 
          cy="58" 
          r="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.1 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
        />
        <motion.line 
          x1="200" y1="52" x2="200" y2="64"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.15 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
        />

        {/* D. AMALAKA (Solar Disc) */}
        <motion.path 
          d="M 180 78 Q 200 70, 220 78 C 228 85, 228 92, 220 95 C 200 98, 180 95, 180 78 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          stroke={activePart === "amalaka" ? activeColor : strokeColor}
          strokeWidth={activePart === "amalaka" ? "2.5" : "1.5"}
        />
        {/* Amalaka grooved flutes */}
        <g strokeWidth="1" opacity="0.8">
          <path d="M 190 75 Q 192 85, 190 92" />
          <path d="M 200 74 L 200 94" />
          <path d="M 210 75 Q 208 85, 210 92" />
        </g>

        {/* E. SHIKHARA / VIMANA (The Curvilinear Spire) */}
        {/* Left Curving Boundary */}
        <motion.path 
          d="M 185 96 C 180 140, 150 280, 140 370"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.4 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          strokeWidth={activePart === "shikhara" ? "3" : "1.8"}
        />
        {/* Right Curving Boundary */}
        <motion.path 
          d="M 215 96 C 220 140, 250 280, 260 370"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.4 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          strokeWidth={activePart === "shikhara" ? "3" : "1.8"}
        />

        {/* Spire Horizontal Bhumi (Tiers) Lines */}
        {[120, 150, 185, 225, 270, 320].map((yVal, idx) => {
          // calculate curved endpoints roughly
          const leftX = 185 - (idx * 6.5);
          const rightX = 215 + (idx * 6.5);
          return (
            <motion.path 
              key={`tier-${idx}`}
              d={`M ${leftX} ${yVal} Q 200 ${yVal - 8}, ${rightX} ${yVal}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6 + idx * 0.15 }}
              stroke={activePart === "shikhara" ? activeColor : strokeColor}
              strokeWidth={activePart === "shikhara" ? "1.8" : "1.2"}
              opacity="0.85"
            />
          );
        })}

        {/* Spire Vertical Carvings Lines */}
        <motion.path 
          d="M 200 96 L 200 370"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          opacity="0.5"
          strokeDasharray="2,2"
        />
        <motion.path 
          d="M 192 96 C 188 150, 175 285, 172 370"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.55 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          opacity="0.4"
        />
        <motion.path 
          d="M 208 96 C 212 150, 225 285, 228 370"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.55 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          opacity="0.4"
        />

        {/* F. GARBHAGRIHA (Base Sanctum structure) */}
        <motion.path 
          d="M 140 370 L 140 435 L 260 435 L 260 370 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.8 }}
          stroke={activePart === "garbhagriha" ? activeColor : strokeColor}
          strokeWidth={activePart === "garbhagriha" ? "2.5" : "1.5"}
        />
        {/* Base molding tiers */}
        <motion.path 
          d="M 130 435 L 130 450 L 270 450 L 270 435 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
          stroke={activePart === "garbhagriha" ? activeColor : strokeColor}
        />
        {/* Sanctuary Inner deity chamber outline (Blueprint mode) */}
        {isB && (
          <motion.rect 
            x="170" y="385" width="60" height="40" 
            stroke="#38bdf8" strokeDasharray="3,3" opacity="0.6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5 }}
          />
        )}

        {/* G. JAGAMOHANA (Devotional Assembly Hall connected to the right) */}
        <motion.path 
          d="M 260 280 L 320 280 L 340 340 L 305 340 L 350 450 L 270 450"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.9 }}
          stroke={activePart === "jagamohana" ? activeColor : strokeColor}
          strokeWidth={activePart === "jagamohana" ? "2.5" : "1.5"}
        />
        {/* Stepped Pyramidal Tiers of Jagamohana (Pidha roof) */}
        {[290, 305, 320, 335].map((yV, idx) => (
          <motion.line 
            key={`pidha-${idx}`}
            x1="260" y1={yV} x2={270 + (idx * 16)} y2={yV}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.2 + idx * 0.1 }}
            stroke={activePart === "jagamohana" ? activeColor : strokeColor}
            opacity="0.8"
          />
        ))}

        {/* Base Plinth Ground Line */}
        <motion.line 
          x1="60" y1="450" x2="360" y2="450"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          stroke={strokeColor}
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}

// 2. KONARK SUN WHEEL
function KonarkWheelSVG({ theme, activePart }: SVGProps) {
  const isB = theme === "blueprint";
  const strokeColor = isB ? "#0ea5e9" : "#ff9933";
  const activeColor = isB ? "#38bdf8" : "#ffd700";

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg" fill="none">
      <defs>
        <filter id="glow-wheel" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={isB ? "4" : "6"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Blueprint Guides */}
      {isB && (
        <g opacity="0.2" stroke="#0ea5e9" strokeWidth="0.8">
          <line x1="20" y1="250" x2="380" y2="250" strokeDasharray="3,3" />
          <line x1="200" y1="70" x2="200" y2="430" strokeDasharray="3,3" />
          {/* Diagonal axes */}
          <line x1="72" y1="122" x2="328" y2="378" strokeDasharray="4,4" />
          <line x1="72" y1="378" x2="328" y2="122" strokeDasharray="4,4" />
          <text x="310" y="240" fill="#38bdf8" fontSize="8" fontFamily="monospace">R = 9.6FT</text>
          <text x="210" y="90" fill="#38bdf8" fontSize="8" fontFamily="monospace">Θ = 45° PIVOT</text>
        </g>
      )}

      <g stroke={strokeColor} strokeWidth="1.5" filter="url(#glow-wheel)" strokeLinecap="round" strokeLinejoin="round">
        
        {/* A. OUTER RIM (Wheel Boundary) */}
        <motion.circle 
          cx="200" 
          cy="250" 
          r="150"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
          strokeWidth={activePart === "torana" ? "3" : "2"}
        />
        <motion.circle 
          cx="200" 
          cy="250" 
          r="138"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.2 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
          strokeWidth="1.2"
        />

        {/* Rim scrollwork circles (representing stone beadwork carvings) */}
        {theme === "golden" && Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const cx = 200 + 144 * Math.cos(rad);
          const cy = 250 + 144 * Math.sin(rad);
          return (
            <circle key={`bead-${i}`} cx={cx} cy={cy} r="2.5" fill="none" stroke={strokeColor} opacity="0.6" />
          );
        })}

        {/* B. CENTRAL AXLE (Hub of the Chariot) */}
        <motion.circle 
          cx="200" 
          cy="250" 
          r="36"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          stroke={activePart === "amalaka" ? activeColor : strokeColor}
          strokeWidth={activePart === "amalaka" ? "2.5" : "1.8"}
        />
        <motion.circle 
          cx="200" 
          cy="250" 
          r="16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          stroke={activePart === "amalaka" ? activeColor : strokeColor}
        />
        <motion.circle 
          cx="200" 
          cy="250" 
          r="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          fill={activePart === "amalaka" ? activeColor : strokeColor}
        />

        {/* C. 8 PRIMARY SPOKES (Broad ornate spoked structure) */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 360) / 8;
          const rad = (angle * Math.PI) / 180;
          
          // Spoke vectors
          const x1 = 200 + 36 * Math.cos(rad);
          const y1 = 250 + 36 * Math.sin(rad);
          const x2 = 200 + 138 * Math.cos(rad);
          const y2 = 250 + 138 * Math.sin(rad);

          // Parallel lines for thickness
          const thickRad = rad + Math.PI / 2;
          const offset = 6;
          const lx1 = x1 + offset * Math.cos(thickRad);
          const ly1 = y1 + offset * Math.sin(thickRad);
          const lx2 = x2 + offset * Math.cos(thickRad);
          const ly2 = y2 + offset * Math.sin(thickRad);

          const rx1 = x1 - offset * Math.cos(thickRad);
          const ry1 = y1 - offset * Math.sin(thickRad);
          const rx2 = x2 - offset * Math.cos(thickRad);
          const ry2 = y2 - offset * Math.sin(thickRad);

          return (
            <g key={`pri-spoke-${idx}`}>
              <motion.line 
                x1={lx1} y1={ly1} x2={lx2} y2={ly2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.6 + idx * 0.1 }}
                stroke={activePart === "shikhara" ? activeColor : strokeColor}
                strokeWidth={activePart === "shikhara" ? "2" : "1.2"}
              />
              <motion.line 
                x1={rx1} y1={ry1} x2={rx2} y2={ry2}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.6 + idx * 0.1 }}
                stroke={activePart === "shikhara" ? activeColor : strokeColor}
                strokeWidth={activePart === "shikhara" ? "2" : "1.2"}
              />
              {/* Ornate Medallion carving along the spoke */}
              <circle 
                cx={200 + 85 * Math.cos(rad)} 
                cy={250 + 85 * Math.sin(rad)} 
                r="6.5" 
                fill={theme === "blueprint" ? "none" : "#0d0907"} 
                stroke={activePart === "shikhara" ? activeColor : strokeColor} 
                strokeWidth="1.2"
              />
            </g>
          );
        })}

        {/* D. 8 SECONDARY SPOKES (Thin spoked pins) */}
        {Array.from({ length: 8 }).map((_, idx) => {
          const angle = (idx * 360) / 8 + 22.5; // Offset by 22.5 degrees
          const rad = (angle * Math.PI) / 180;
          
          const x1 = 200 + 36 * Math.cos(rad);
          const y1 = 250 + 36 * Math.sin(rad);
          const x2 = 200 + 138 * Math.cos(rad);
          const y2 = 250 + 138 * Math.sin(rad);

          return (
            <motion.line 
              key={`sec-spoke-${idx}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.2 + idx * 0.08 }}
              stroke={activePart === "jagamohana" ? activeColor : strokeColor}
              strokeWidth="0.8"
              strokeDasharray={theme === "blueprint" ? "3,3" : "none"}
              opacity="0.7"
            />
          );
        })}
      </g>
    </svg>
  );
}

// 3. MUKTESHWAR TEMPLE TORANA
function MukteshwarToranaSVG({ theme, activePart }: SVGProps) {
  const isB = theme === "blueprint";
  const strokeColor = isB ? "#0ea5e9" : "#ff9933";
  const activeColor = isB ? "#38bdf8" : "#ffd700";

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg" fill="none">
      <defs>
        <filter id="glow-torana" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={isB ? "4" : "6"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Blueprint Grid Guides */}
      {isB && (
        <g opacity="0.15" stroke="#0ea5e9" strokeWidth="0.8">
          <line x1="200" y1="40" x2="200" y2="460" strokeDasharray="3,3" />
          {/* Symmetrical guide arc */}
          <path d="M 100 280 A 100 100 0 0 1 300 280" strokeDasharray="4,4" />
          <text x="210" y="270" fill="#38bdf8" fontSize="8" fontFamily="monospace">SPAN = 12.4FT</text>
          <text x="210" y="200" fill="#38bdf8" fontSize="8" fontFamily="monospace">R = 6.2FT</text>
        </g>
      )}

      <g stroke={strokeColor} strokeWidth="1.5" filter="url(#glow-torana)" strokeLinecap="round" strokeLinejoin="round">
        
        {/* A. SHIKHARA IN THE BACKGROUND */}
        <g opacity="0.3" strokeWidth="1">
          {/* Spire outlines */}
          <motion.path 
            d="M 200 60 C 190 90, 165 200, 160 280"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.path 
            d="M 200 60 C 210 90, 235 200, 240 280"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          {/* Horizontal layers of background shrine */}
          {[100, 140, 180, 220].map((yV, i) => (
            <line key={`bg-layer-${i}`} x1={200 - (i * 8 + 10)} y1={yV} x2={200 + (i * 8 + 10)} y2={yV} />
          ))}
          {/* Spire Crown */}
          <circle cx="200" cy="50" r="10" />
          <line x1="200" y1="40" x2="200" y2="30" />
        </g>

        {/* B. THE SACRED TORANA (Foregound Archway) */}
        {/* Left Pillar */}
        <motion.path 
          d="M 90 440 L 90 280 L 110 280 L 110 440 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          stroke={activePart === "garbhagriha" ? activeColor : strokeColor}
          strokeWidth={activePart === "garbhagriha" ? "2.2" : "1.5"}
        />
        {/* Right Pillar */}
        <motion.path 
          d="M 290 440 L 290 280 L 310 280 L 310 440 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          stroke={activePart === "garbhagriha" ? activeColor : strokeColor}
          strokeWidth={activePart === "garbhagriha" ? "2.2" : "1.5"}
        />

        {/* Decorative moldings on Pillars */}
        {Array.from({ length: 4 }).map((_, idx) => {
          const yVal = 295 + idx * 45;
          return (
            <g key={`mold-${idx}`}>
              <line x1="86" y1={yVal} x2="114" y2={yVal} stroke={strokeColor} strokeWidth="1" />
              <line x1="286" y1={yVal} x2="314" y2={yVal} stroke={strokeColor} strokeWidth="1" />
            </g>
          );
        })}

        {/* C. SEMI-CIRCULAR ARCHWAY LINTEL (The Iconic Torana Arch) */}
        {/* Outer Arch */}
        <motion.path 
          d="M 75 280 A 125 125 0 0 1 325 280"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.5 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
          strokeWidth={activePart === "torana" ? "3" : "2"}
        />
        {/* Inner Arch */}
        <motion.path 
          d="M 115 280 A 85 85 0 0 1 285 280"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.6 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
          strokeWidth={activePart === "torana" ? "2" : "1.5"}
        />

        {/* Decorative scroll loops inside the arch (Makara motifs) */}
        {theme === "golden" && (
          <motion.path 
            d="M 100 280 Q 200 130, 300 280"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.8 }}
            stroke={activeColor}
            strokeWidth="0.8"
            strokeDasharray="4,4"
          />
        )}

        {/* Medallions/carvings at the top apex of the arch */}
        <motion.circle 
          cx="200" 
          cy="155" 
          r="8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
          fill={theme === "blueprint" ? "none" : "#0d0907"}
        />
        {/* Flanking decorative carvings (Makara heads at the base of the arch) */}
        <motion.path 
          d="M 70 280 Q 60 260, 75 255 Q 90 260, 80 280 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
        />
        <motion.path 
          d="M 330 280 Q 340 260, 325 255 Q 310 260, 320 280 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1 }}
          stroke={activePart === "torana" ? activeColor : strokeColor}
        />

        {/* D. BASE/PLINTH */}
        <motion.line 
          x1="50" y1="440" x2="350" y2="440"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          stroke={strokeColor}
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}

// 4. BHARTIPADA TEMPLE ELEVATION
function BhartipadaTempleSVG({ theme, activePart }: SVGProps) {
  const isB = theme === "blueprint";
  const strokeColor = isB ? "#0ea5e9" : "#ff9933";
  const activeColor = isB ? "#38bdf8" : "#ffd700";

  return (
    <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-lg" fill="none">
      <defs>
        <filter id="glow-bhartipada" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={isB ? "4" : "6"} result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Blueprint Guides and dimensional arrows (Vastu layout) */}
      {isB && (
        <g opacity="0.25" stroke="#0ea5e9" strokeWidth="0.8">
          {/* Vertical height indicator line */}
          <line x1="80" y1="60" x2="80" y2="440" />
          <line x1="75" y1="60" x2="85" y2="60" />
          <line x1="75" y1="440" x2="85" y2="440" />
          <text x="50" y="250" fill="#38bdf8" fontSize="8" fontFamily="monospace" transform="rotate(-90 50 250)">HEIGHT = 108FT</text>

          {/* Horizontal width indicator line */}
          <line x1="120" y1="465" x2="330" y2="465" />
          <line x1="120" y1="460" x2="120" y2="470" />
          <line x1="330" y1="460" x2="330" y2="470" />
          <text x="200" y="480" fill="#38bdf8" fontSize="8" fontFamily="monospace">WIDTH = 64FT</text>

          {/* Vastu Purusha grid lines (square sectors) */}
          <rect x="120" y="380" width="60" height="60" strokeDasharray="2,2" />
          <rect x="180" y="380" width="60" height="60" strokeDasharray="2,2" />
          <rect x="240" y="380" width="90" height="60" strokeDasharray="2,2" />
        </g>
      )}

      <g stroke={strokeColor} strokeWidth="1.5" filter="url(#glow-bhartipada)" strokeLinecap="round" strokeLinejoin="round">
        
        {/* A. REKHA DEULA (Main Spire on Left-Center) */}
        {/* Flag */}
        <motion.path 
          d="M 170 50 L 190 44 Q 198 40, 204 46 L 204 53 Q 196 48, 190 52 L 170 56 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
          strokeWidth="1.2"
        />
        {/* Kalasa */}
        <motion.path 
          d="M 166 70 Q 164 60, 170 58 Q 176 60, 174 70 Q 170 72, 166 70 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.15 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
          strokeWidth={activePart === "kalasa" ? "2.5" : "1.5"}
        />
        {/* Amalaka */}
        <motion.path 
          d="M 152 82 Q 170 75, 188 82 C 194 88, 194 92, 188 95 C 170 98, 152 95, 152 82 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.3 }}
          stroke={activePart === "kalasa" ? activeColor : strokeColor}
          strokeWidth={activePart === "kalasa" ? "2.5" : "1.5"}
        />

        {/* Curvilinear Spire Tower */}
        <motion.path 
          d="M 156 96 C 152 140, 130 290, 120 380"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.4 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          strokeWidth={activePart === "shikhara" ? "3" : "1.8"}
        />
        <motion.path 
          d="M 184 96 C 188 140, 210 290, 220 380"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: 0.4 }}
          stroke={activePart === "shikhara" ? activeColor : strokeColor}
          strokeWidth={activePart === "shikhara" ? "3" : "1.8"}
        />

        {/* Horizontal horizontal dividing bands */}
        {[130, 175, 225, 280, 335].map((yV, idx) => {
          const leftX = 156 - (idx * 6.4);
          const rightX = 184 + (idx * 6.4);
          return (
            <motion.path 
              key={`bTier-${idx}`}
              d={`M ${leftX} ${yV} Q 170 ${yV - 6}, ${rightX} ${yV}`}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6 + idx * 0.15 }}
              stroke={activePart === "shikhara" ? activeColor : strokeColor}
              opacity="0.85"
            />
          );
        })}

        {/* B. GARBHAGRIHA BASE */}
        <motion.path 
          d="M 120 380 L 120 440 L 220 440 L 220 380 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.7 }}
          stroke={activePart === "garbhagriha" ? activeColor : strokeColor}
          strokeWidth={activePart === "garbhagriha" ? "2.5" : "1.5"}
        />

        {/* C. PIDHA DEULA / JAGAMOHANA ASSEMBLY HALL (Connected on Right) */}
        {/* Pyramidal Spire Roof */}
        <motion.path 
          d="M 220 280 L 310 320 L 330 380 L 220 380"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          stroke={activePart === "jagamohana" ? activeColor : strokeColor}
          strokeWidth={activePart === "jagamohana" ? "2.5" : "1.5"}
        />
        {/* Stepped segments on the Pyramidal roof */}
        {[295, 310, 330, 350].map((yV, idx) => (
          <motion.line 
            key={`pTier-${idx}`}
            x1="220" y1={yV} x2={220 + (idx * 27) + 20} y2={yV}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 + idx * 0.1 }}
            stroke={activePart === "jagamohana" ? activeColor : strokeColor}
            opacity="0.8"
          />
        ))}

        {/* Jagamohana Base Chamber */}
        <motion.path 
          d="M 220 380 L 220 440 L 330 440 L 330 380 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 0.9 }}
          stroke={activePart === "jagamohana" ? activeColor : strokeColor}
          strokeWidth={activePart === "jagamohana" ? "2" : "1.5"}
        />

        {/* Plinth moldings */}
        <motion.path 
          d="M 110 440 L 110 450 L 340 450 L 340 440 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          stroke={strokeColor}
        />
        <motion.line 
          x1="80" y1="450" x2="370" y2="450"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          stroke={strokeColor}
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}
