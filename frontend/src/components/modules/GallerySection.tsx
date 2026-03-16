"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";

// Placeholder images for the gallery
const PICS = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594950669223-28f43048a1c9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565551984260-24dd6eec9ece?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621665476313-9a4f4d2f8016?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542013809-51000fc773ca?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1570146959600-e179bc1cc778?q=80&w=800&auto=format&fit=crop"
];

export function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-maroon/5 rounded-full mb-6">
            <ImageIcon className="w-8 h-8 text-maroon" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">Divine Glimpses</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            A visual anthology of our traditions, reconstruction phases, and spiritual gatherings.
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
                  View Full Image
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-saffron transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-10 h-10" />
          </button>
          
          <img 
            src={selectedImg} 
            alt="Enlarged Temple View" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
