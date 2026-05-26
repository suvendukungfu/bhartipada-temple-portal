"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang: language, setLang: setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.history"), href: "#history" },
    { name: t("nav.deity"), href: "#deity" },
    { name: t("nav.gallery"), href: "#gallery" },
    { name: t("nav.tour"), href: "#vr-tour" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिन्दी" },
    { code: "or", name: "ଓଡ଼ିଆ" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-sandstone/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-saffron flex items-center justify-center text-white font-serif font-bold">
            ॐ
          </div>
          <span className={`font-serif text-xl font-bold ${isScrolled ? 'text-maroon' : 'text-white'}`}>
            {t("hero.title")}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             <Link 
               key={link.name} 
               href={link.href}
               className={`text-sm font-medium transition-colors hover:text-saffron ${isScrolled ? 'text-maroon/80' : 'text-white/90'}`}
             >
               {link.name}
             </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative">
            <button 
              onMouseEnter={() => setIsLangOpen(true)}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-saffron ${isScrolled ? 'text-maroon/80' : 'text-white/90'}`}
            >
              <Globe className="w-4 h-4" />
              <span>{languages.find(l => l.code === language)?.name}</span>
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  onMouseLeave={() => setIsLangOpen(false)}
                  className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-maroon/5 py-2 overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setIsLangOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-2 text-sm text-maroon hover:bg-saffron/10 transition-colors text-left"
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check className="w-3 h-3 text-saffron" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link 
            href="/donate" 
            className="bg-saffron hover:bg-saffron/90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-saffron/20"
          >
            {t("nav.donate")}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Language Cycle */}
            <button 
                onClick={() => {
                    const idx = languages.findIndex(l => l.code === language);
                    const next = languages[(idx + 1) % languages.length].code as Language;
                    setLanguage(next);
                }}
                className={`px-3 py-2 rounded-full flex items-center gap-2 text-xs font-bold ${isScrolled ? 'text-maroon bg-maroon/5' : 'text-white bg-white/10'}`}
            >
                <Globe className="w-4 h-4" />
                <span>{languages.find(l => l.code === language)?.name}</span>
            </button>
            <button 
                className={`p-2 ${isScrolled ? 'text-maroon' : 'text-white'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
            <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-sandstone absolute top-full w-full shadow-lg border-t border-saffron/10 overflow-hidden"
            >
            <div className="flex flex-col p-4 gap-2">
                {navLinks.map((link) => (
                <Link 
                    key={link.name} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-maroon font-serif font-bold text-lg p-3 hover:bg-saffron/10 rounded-xl transition-colors"
                >
                    {link.name}
                </Link>
                ))}
                <Link 
                href="/donate" 
                onClick={() => setIsOpen(false)}
                className="bg-saffron text-white text-center p-4 rounded-xl font-bold mt-2 shadow-lg shadow-saffron/20"
                >
                {t("nav.donate")}
                </Link>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
