"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Users } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const COMMITTEE_MEMBERS = [
  {
    key: "member_1",
    image: "/assets/images/member_1.png"
  },
  {
    key: "member_2",
    image: "/assets/images/member_2.png"
  },
  {
    key: "member_3",
    image: "/assets/images/member_3.png"
  }
];

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 w-full h-1 bg-linear-to-r from-transparent via-saffron to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-saffron/10 rounded-full mb-6 text-saffron">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">{t("about.title")}</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            {t("about.subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMITTEE_MEMBERS.map((member, idx) => (
            <FadeIn 
              key={member.key} 
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
                <h3 className="font-serif font-bold text-xl text-maroon">{t(`about.members.${member.key}.name`)}</h3>
                <p className="text-saffron font-bold text-sm mb-3 uppercase tracking-wider">{t(`about.members.${member.key}.role`)}</p>
                <p className="text-foreground/90 text-sm leading-relaxed">{t(`about.members.${member.key}.contribution`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
