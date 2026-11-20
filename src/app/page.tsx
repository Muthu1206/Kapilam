import { LoadingIntro } from "@/components/layout/LoadingIntro";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ScrollRefresh } from "@/components/ui/ScrollRefresh";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { AboutSection } from "@/components/sections/AboutSection";
import { CollectionSection } from "@/components/sections/CollectionSection";
import { CraftsmanshipSection } from "@/components/sections/CraftsmanshipSection";
import { SustainabilitySection } from "@/components/sections/SustainabilitySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { InstagramSection } from "@/components/sections/InstagramSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div className="relative bg-obsidian text-ivory">
      <ScrollRefresh />
      <ScrollProgress />
      <CustomCursor />
      <LoadingIntro />
      <Navbar />
      <main>
        <HeroSection />
        <BrandIntro />
        <AboutSection />
        <CollectionSection />
        <CraftsmanshipSection />
        <SustainabilitySection />
        <GallerySection />
        <PhilosophySection />
        <InstagramSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
