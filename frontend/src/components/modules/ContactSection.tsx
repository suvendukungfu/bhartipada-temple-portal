"use client";

import { FadeIn } from "@/components/ui/FadeIn";
import { MapPin, Mail, Phone, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-sandstone">
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-maroon mb-4">{t("contact.title")}</h2>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            {t("contact.subtitle")}
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-2xl border border-maroon/5">
          {/* Map & Information Side */}
          <div className="p-8 md:p-12 lg:pr-8">
            <h3 className="text-3xl font-serif font-bold text-maroon mb-8">{t("contact.info_title")}</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">{t("contact.location_label")}</h4>
                  <p className="text-foreground/70 leading-relaxed whitespace-pre-line">
                    {t("contact.address_value_full")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-saffron" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground mb-1">{t("contact.timings_label")}</h4>
                  <p className="text-foreground/70 mb-1"><span className="font-semibold">{t("contact.morning_label")}:</span> {t("contact.morning_time")}</p>
                  <p className="text-foreground/70"><span className="font-semibold">{t("contact.evening_label")}:</span> {t("contact.evening_time")}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-sandstone rounded-xl">
              <h4 className="font-serif font-bold text-maroon mb-4">{t("contact.committee_contact_label")}</h4>
              <div className="space-y-3">
                <p className="flex items-center gap-3 text-foreground/80">
                  <Phone className="w-5 h-5 text-saffron shrink-0" /> +91 98765 43210
                </p>
                <p className="flex items-center gap-3 text-foreground/80">
                  <Mail className="w-5 h-5 text-saffron shrink-0" /> contact@bhartipadatemple.org
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed Side */}
          <div className="relative h-[400px] lg:h-auto min-h-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.41168925409!2d85.74415891392683!3d20.299949755502662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33c8b!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
