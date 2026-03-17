"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";

import Image from "next/image";

// Placeholder images for the gallery
const PICS = [
  "/assets/images/gallery_1.png",
  "/assets/images/gallery_2.png",
  "/assets/images/gallery_3.png",
  "/assets/images/gallery_4.png",
  "/assets/images/hero_bg.png",
  "/assets/images/deity.png"
];

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function GallerySection() {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
          {PICS.map((img, idx) => (
            <FadeIn 
              key={idx} 
              delay={idx * 0.1} 
              direction="up"
              className={`relative cursor-pointer group rounded-xl overflow-hidden ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
              onClick={() => setSelectedImg(img)}
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
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

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-saffron transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-10 h-10" />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
            <Image 
              src={selectedImg} 
              alt="Enlarged Temple View" 
              fill
              className="object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
