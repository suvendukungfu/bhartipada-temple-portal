"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useState } from "react";
import { TimelineEvent } from "@/types";

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1400s",
    title: "Origins & Old Temple",
    desc: "The spiritual foundation of Bhartipada was laid by a group of wandering sages who discovered the self-manifested idol of the Devi.",
    img: "https://images.unsplash.com/photo-1590050752117-23a9d7f212bc?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "1750",
    title: "The Royal Patronage",
    desc: "The local kingdom's Maharaja reconstructed the temple in the classic Odisha architectural style following a divine vision.",
    img: "https://images.unsplash.com/photo-1566730633190-7d7216960893?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "1940s",
    title: "Cultural Hub",
    desc: "The temple became a center for Odissi dance and spiritual discourse, fostering a community of artists and devotees.",
    img: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1000&auto=format&fit=crop"
  },
  {
    year: "2024",
    title: "Digital Awakening",
    desc: "Launching our global digital platform to connect devotees and preserve our legacy for future generations.",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop"
  }
];

export function HistorySection() {
  const [activeEvent, setActiveEvent] = useState(TIMELINE_EVENTS[0]);

  return (
    <section id="history" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">Our Sacred Legacy</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Active Event Preview */}
          <FadeIn direction="right" className="w-full lg:w-1/2 group">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${activeEvent.img})` }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-maroon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-nowrap">
                <span className="text-temple-gold font-bold text-lg mb-2 block">{activeEvent.year}</span>
                <h3 className="font-serif text-3xl font-bold mb-2">{activeEvent.title}</h3>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-8 relative">
              <div className="absolute left-1/2 -ml-px top-0 bottom-0 w-0.5 bg-maroon/10 before:absolute before:inset-0 before:bg-linear-to-b before:from-transparent before:via-saffron before:to-transparent" />
              
              {TIMELINE_EVENTS.map((event, idx) => (
                <div 
                  key={event.year} 
                  className={`relative flex items-center gap-8 cursor-pointer group transition-all duration-300 ${activeEvent.year === event.year ? 'scale-105' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100'}`}
                  onClick={() => setActiveEvent(event)}
                >
                  <div className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10 ${activeEvent.year === event.year ? 'bg-saffron ring-4 ring-saffron/20' : 'bg-maroon/40'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-sandstone/50 p-6 rounded-2xl border border-maroon/5 group-hover:bg-white group-hover:shadow-xl transition-all">
                    <span className="text-saffron font-bold text-sm uppercase tracking-widest block mb-1">{event.year}</span>
                    <h4 className="font-serif text-xl font-bold text-maroon mb-2">{event.title}</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
