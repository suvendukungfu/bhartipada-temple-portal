"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const TIMELINE_EVENTS = [
  {
    year: "1400s",
    title: "Origins & Old Temple",
    desc: "The original sanctuary was built by the village ancestors, serving as the spiritual heart for centuries.",
    img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop"
  },
  {
    year: "2015",
    title: "Foundation Reconstruction",
    desc: "A community-led effort began to rebuild the decaying structure to preserve our heritage.",
    img: "https://images.unsplash.com/photo-1594950669223-28f43048a1c9?q=80&w=800&auto=format&fit=crop"
  },
  {
    year: "2020",
    title: "Construction Phase",
    desc: "Pillars were erected and the grand design slowly materialized through worldwide devotee donations.",
    img: "https://images.unsplash.com/photo-1565551984260-24dd6eec9ece?q=80&w=800&auto=format&fit=crop"
  },
  {
    year: "Present",
    title: "Completed Temple",
    desc: "The glorious sanctum stands tall, welcoming thousands for daily darshan and grand festivals.",
    img: "https://images.unsplash.com/photo-1621665476313-9a4f4d2f8016?q=80&w=800&auto=format&fit=crop"
  }
];

export function HistorySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="history" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">Temple History</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-3xl mx-auto text-lg text-foreground/80">
            Trace the divine journey of Bhartipada Temple from its ancient humble beginnings to its glorious modern reconstruction.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right" className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div 
                key={event.year}
                className={`absolute inset-0 transition-opacity duration-700 ${idx === activeTab ? 'opacity-100' : 'opacity-0 z-0'}`}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-temple-gold font-bold text-lg mb-2 block">{event.year}</span>
                  <h3 className="font-serif text-3xl font-bold mb-2">{event.title}</h3>
                </div>
              </div>
            ))}
          </FadeIn>

          <FadeIn direction="left">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-saffron before:to-maroon">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div 
                  key={event.year} 
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer ${idx === activeTab ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`}
                  onClick={() => setActiveTab(idx)}
                >
                  {/* Timeline dot */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 ${idx === activeTab ? 'bg-saffron border-white' : 'bg-white border-sandstone'}`}>
                    <div className={`w-3 h-3 rounded-full ${idx === activeTab ? 'bg-white' : 'bg-transparent'}`} />
                  </div>
                  
                  {/* Content box */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] ml-14 md:ml-0 p-6 rounded-xl bg-sandstone border border-saffron/20 shadow-sm transition-transform group-hover:-translate-y-1">
                    <span className="text-saffron font-bold text-sm mb-1 block">{event.year}</span>
                    <h4 className="font-serif text-xl font-bold text-maroon mb-2">{event.title}</h4>
                    <p className="text-foreground/70 text-sm">{event.desc}</p>
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
