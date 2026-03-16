"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Users } from "lucide-react";

const COMMITTEE_MEMBERS = [
  {
    name: "Sri Ramesh Kumar",
    role: "President",
    contribution: "Led the fundraising and foundation phase.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Dr. Ananya Dash",
    role: "Secretary",
    contribution: "Manages temple events and daily administration.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Pandit Rajeev Sharma",
    role: "Head Priest",
    contribution: "Guiding the spiritual rituals for over 30 years.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-saffron to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-saffron/10 rounded-full mb-6 text-saffron">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">Temple Committee</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            Meet the dedicated individuals who volunteer their lives to maintain our spiritual heritage.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMITTEE_MEMBERS.map((member, idx) => (
            <FadeIn 
              key={member.name} 
              delay={idx * 0.15} 
              direction="up"
              className="bg-sandstone rounded-2xl overflow-hidden shadow-lg border border-maroon/5 group"
            >
              <div className="aspect-square relative overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-r from-saffron/10 to-transparent rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-r from-maroon/5 to-transparent rounded-full -ml-32 -mb-32 blur-3xl text-nowrap" />
              </div>
              <div className="p-6 relative bg-white -mt-10 mx-4 mb-4 rounded-xl shadow-md z-10 transition-transform group-hover:-translate-y-2">
                <h3 className="font-serif font-bold text-xl text-maroon">{member.name}</h3>
                <p className="text-saffron font-bold text-sm mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed">{member.contribution}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
