"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageSliderProps {
  before: string;
  after: string;
}

export function ImageSlider({ before, after }: ImageSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (x: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percent = ((x - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(percent, 0), 100));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl cursor-ew-resize select-none border-4 border-white/20"
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After Image (full background) */}
      <Image
        src={after}
        alt="Reconstructed temple view"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 66vw"
        loading="lazy"
        quality={80}
      />

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 border-r-2 border-saffron overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Ancient temple structure"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
          loading="lazy"
          quality={80}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-saffron z-10"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-saffron rounded-full shadow-xl flex items-center justify-center border-2 border-white">
          <div className="flex gap-0.5">
             <div className="w-1 h-3 bg-white/50 rounded-full" />
             <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-6 left-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
        Ancient Structure
      </div>
      <div className="absolute top-6 right-6 px-3 py-1 bg-saffron/80 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
        New Reconstruction
      </div>
    </div>
  );
}
