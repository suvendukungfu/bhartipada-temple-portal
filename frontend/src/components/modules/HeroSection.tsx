"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-sandstone">
      {/* Background with spiritual pattern or gradient placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/90 via-saffron/80 to-temple-gold/70" />
        {/* Placeholder for temple background image */}
        <div 
          className="w-full h-full bg-cover bg-center mix-blend-overlay opacity-40"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1570146959600-e179bc1cc778?q=80&w=2000&auto=format&fit=crop")' }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center text-white">
        <FadeIn delay={0.2} direction="down">
           <div className="w-20 h-20 mx-auto rounded-full bg-saffron/80 backdrop-blur-sm border-2 border-temple-gold flex items-center justify-center text-4xl mb-6 shadow-2xl">
              ॐ
           </div>
        </FadeIn>
        
        <FadeIn delay={0.4} direction="up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg tracking-tight">
            Bhartipada Temple
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.6} direction="up">
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto mb-10 text-white/90 drop-shadow-md">
            A spiritual odyssey connecting devotees worldwide. Experience the divine grace of our ancient heritage.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} direction="up" className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/donate" 
            className="group flex items-center justify-center gap-2 bg-saffron text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-white hover:text-saffron shadow-lg shadow-saffron/30 hover:scale-105"
          >
            <Heart className="w-5 h-5 group-hover:animate-pulse" />
            Donate Now
          </Link>
          <Link 
            href="#history" 
            className="group flex items-center justify-center gap-2 bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-full text-lg font-bold transition-all hover:bg-white/10 hover:border-white shadow-lg hover:scale-105"
          >
            Explore Temple
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>

      {/* Decorative divine rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-temple-gold/30 to-transparent blur-[100px] pointer-events-none" />
    </section>
  );
}
