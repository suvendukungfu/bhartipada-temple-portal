"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useState, useEffect, useCallback } from "react";
import { X, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const GALLERY_ITEMS = [
  { src: "/assets/images/carving_1.jpg", alt: "Intricate stone carving – temple deity panel detail", width: 1600, height: 1064 },
  { src: "/assets/images/carving_2.jpg", alt: "Stone relief sculpture – floral and geometric motifs", width: 1600, height: 1064 },
  { src: "/assets/images/carving_3.jpg", alt: "Carved temple pillar – Kalinga architectural ornamentation", width: 1600, height: 1064 },
  { src: "/assets/images/carving_4.jpg", alt: "Temple wall carving – mythological narrative panel", width: 1600, height: 1064 },
  { src: "/assets/images/carving_5.jpg", alt: "Ornamental stone facade – temple exterior detailing", width: 1600, height: 1064 },
  { src: "/assets/images/carving_6.jpg", alt: "Ceremonial entrance carving – temple torana arch detail", width: 1600, height: 1064 },
];

export function GallerySection() {
  const { t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const goNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % GALLERY_ITEMS.length);
  }, [selectedIdx]);

  const goPrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [selectedIdx]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIdx, goNext, goPrev]);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-maroon/5 rounded-full mb-6">
            <ImageIcon className="w-8 h-8 text-maroon" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">{t("gallery.title")}</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            {t("gallery.subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <FadeIn 
              key={idx} 
              delay={idx * 0.1} 
              direction="up"
              className={`relative cursor-pointer group rounded-xl overflow-hidden ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              onClick={() => setSelectedIdx(idx)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={idx === 0 || idx === 3 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                quality={80}
              />
              <div className="absolute inset-0 bg-maroon/0 group-hover:bg-maroon/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-serif text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  {t("gallery.view_full")}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox with navigation */}
      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedIdx(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-saffron transition-colors z-20"
            onClick={() => setSelectedIdx(null)}
            aria-label="Close lightbox"
          >
            <X className="w-10 h-10" />
          </button>

          {/* Prev / Next buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm border border-white/10"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all backdrop-blur-sm border border-white/10"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div 
            className="relative w-full h-full max-w-5xl max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image 
              src={GALLERY_ITEMS[selectedIdx].src} 
              alt={GALLERY_ITEMS[selectedIdx].alt} 
              fill
              className="object-contain rounded-lg shadow-2xl"
              quality={90}
              priority
              sizes="90vw"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono tracking-wider bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
            {selectedIdx + 1} / {GALLERY_ITEMS.length}
          </div>
        </div>
      )}
    </section>
  );
}
