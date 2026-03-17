"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-maroon text-sandstone/80 pt-16 pb-8 border-t-[6px] border-saffron">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-saffron flex items-center justify-center text-white font-serif font-bold text-xl">
                ॐ
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                {t("hero.title")}
              </span>
            </div>
            <p className="mb-6 leading-relaxed">
              {t("contact.footer_desc")}
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-serif text-xl font-bold mb-6">{t("contact.quick_links")}</h3>
            <ul className="space-y-3">
              <li><Link href="#history" className="hover:text-saffron transition-colors">{t("nav.history")}</Link></li>
              <li><Link href="#deity" className="hover:text-saffron transition-colors">{t("nav.deity")}</Link></li>
              <li><Link href="#gallery" className="hover:text-saffron transition-colors">{t("nav.gallery")}</Link></li>
              <li><Link href="/donate" className="hover:text-saffron transition-colors text-white font-medium">{t("nav.donate")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-xl font-bold mb-6">{t("contact.address_title")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron shrink-0 mt-1" />
                <span className="whitespace-pre-line">{t("contact.address_value")}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron shrink-0" />
                <span>contact@bhartipadatemple.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sandstone/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sandstone/60">
          <p>© {new Date().getFullYear()} {t("hero.title")}. {t("contact.copyright")}</p>
          <p className="text-center md:text-right max-w-sm">
            {t("contact.dev_credit")}
          </p>
        </div>
      </div>
    </footer>
  );
}
