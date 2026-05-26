import { HeroSection } from "@/components/modules/HeroSection";
import { HistorySection } from "@/components/modules/HistorySection";
import { TempleDrawingsSection } from "@/components/modules/TempleDrawingsSection";
import { DeitySection } from "@/components/modules/DeitySection";
import { GallerySection } from "@/components/modules/GallerySection";
import { VRSection } from "@/components/modules/VRSection";
import { DonationSection } from "@/components/modules/DonationSection";
import { DonorWall } from "@/components/modules/DonorWall";
import { AboutSection } from "@/components/modules/AboutSection";
import { ContactSection } from "@/components/modules/ContactSection";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden selection:bg-saffron selection:text-maroon">
      {/* Hero: cinematic entry */}
      <HeroSection />

      {/* History: interactive timeline + image slider */}
      <HistorySection />

      {/* Kalinga Vastu Vidya: Interactive temple architectural blueprints & sketches */}
      <TempleDrawingsSection />

      {/* Deity: storytelling */}
      <DeitySection />

      {/* 3D VR: main digital experience */}
      <VRSection />

      {/* Gallery: visual journey */}
      <GallerySection />

      {/* Donation: seva integration */}
      <DonationSection />

      {/* Community: donor honor wall */}
      <DonorWall />

      {/* Information sections */}
      <AboutSection />
      
      {/* Footer / Connect */}
      <ContactSection />
    </main>
  );
}
