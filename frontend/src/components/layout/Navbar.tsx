"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "History", href: "#history" },
    { name: "Deity", href: "#deity" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
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
          {/* A small decorative icon or logo placeholder */}
          <div className="w-8 h-8 rounded-full bg-saffron flex items-center justify-center text-white font-serif font-bold">
            ॐ
          </div>
          <span className={`font-serif text-xl font-bold ${isScrolled ? 'text-maroon' : 'text-white'}`}>
            Bhartipada Temple
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
          <Link 
            href="/donate" 
            className="bg-saffron hover:bg-saffron/90 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-saffron/20"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-maroon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu color={isScrolled ? "#7F1D1D" : "white"} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-sandstone absolute top-full w-full shadow-lg border-t border-saffron/10"
        >
          <div className="flex flex-col p-4 gap-4">
            {navLinks.map((link) => (
               <Link 
                 key={link.name} 
                 href={link.href}
                 onClick={() => setIsOpen(false)}
                 className="text-maroon font-medium p-2 hover:bg-saffron/10 rounded-md"
               >
                 {link.name}
               </Link>
            ))}
            <Link 
              href="/donate" 
              onClick={() => setIsOpen(false)}
              className="bg-saffron text-white text-center p-3 rounded-md font-medium mt-2"
            >
              Donate Now
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
