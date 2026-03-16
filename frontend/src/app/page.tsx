import { HeroSection } from "@/components/modules/HeroSection";
import { HistorySection } from "@/components/modules/HistorySection";
import { DeitySection } from "@/components/modules/DeitySection";
import { GallerySection } from "@/components/modules/GallerySection";
import { AboutSection } from "@/components/modules/AboutSection";
import { ContactSection } from "@/components/modules/ContactSection";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <HistorySection />
      <DeitySection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
