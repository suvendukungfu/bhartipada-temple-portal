import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "Bhartipada Temple",
  description: "A digital ecosystem for Bhartipada Temple",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans+Devanagari:wght@400;500;700&family=Noto+Sans+Oriya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className="antialiased selection:bg-saffron/20 selection:text-maroon flex flex-col min-h-screen"
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
