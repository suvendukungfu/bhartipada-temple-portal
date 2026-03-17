"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { Sparkles, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function DeitySection() {
  const { t } = useLanguage();

  return (
    <section id="deity" className="py-24 bg-sandstone relative overflow-hidden">
      {/* Decorative mandala background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-temple-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <FadeIn direction="right" className="w-full lg:w-1/2">
            <div className="relative rounded-t-full rounded-b-3xl overflow-hidden border-8 border-white shadow-2xl aspect-3/4 max-w-md mx-auto lg:mx-0">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: 'url("/assets/images/deity.png")' }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-maroon/90 to-transparent p-8 text-center">
                <h3 className="text-3xl font-serif text-white font-bold drop-shadow-md">{t("deity.name")}</h3>
                <p className="text-saffron font-medium mt-2">{t("deity.tagline")}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" className="w-full lg:w-1/2 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/10 text-maroon font-serif font-medium mb-4">
                <Sparkles className="w-4 h-4 text-saffron" />
                {t("deity.significance")}
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-6 leading-tight">
                {t("deity.title")}
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                {t("deity.description_1")}
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {t("deity.description_2")}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-maroon/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-saffron/20 to-transparent rounded-bl-full transition-transform group-hover:scale-110" />
              
              <h4 className="flex items-center gap-3 text-2xl font-serif font-bold text-maroon mb-6">
                <Calendar className="w-6 h-6 text-saffron" />
                {t("deity.festivals_title")}
              </h4>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-maroon/10 flex items-center justify-center text-maroon font-bold text-sm">{t("deity.festivals.navratri.month")}</div>
                  <div>
                    <strong className="text-lg font-serif text-foreground block">{t("deity.festivals.navratri.name")}</strong>
                    <span className="text-sm text-foreground/70">{t("deity.festivals.navratri.desc")}</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-maroon/10 flex items-center justify-center text-maroon font-bold text-sm">{t("deity.festivals.chaitra.month")}</div>
                  <div>
                    <strong className="text-lg font-serif text-foreground block">{t("deity.festivals.chaitra.name")}</strong>
                    <span className="text-sm text-foreground/70">{t("deity.festivals.chaitra.desc")}</span>
                  </div>
                </li>
              </ul>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
