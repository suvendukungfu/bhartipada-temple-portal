import type { Metadata } from "next";
import { Inter, Lora, Noto_Sans_Devanagari, Noto_Sans_Oriya } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: 'swap',
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: 'swap',
});

const notoHindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  display: 'swap',
  weight: ['400', '500', '700'],
});

const notoOriya = Noto_Sans_Oriya({
  variable: "--font-odia",
  subsets: ["oriya"],
  display: 'swap',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Bhartipada Temple",
  description: "A digital ecosystem for Bhartipada Temple",
};

import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} ${notoHindi.variable} ${notoOriya.variable} antialiased selection:bg-saffron/20 selection:text-maroon flex flex-col min-h-screen`}
      >
        <LanguageProvider>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
