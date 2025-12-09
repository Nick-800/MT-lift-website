import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FloorIndicator from "@/components/FloorIndicator";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";

const floorLabels = ["Home", "Services", "About", "Projects", "Partners", "Contact"];

const Index = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const navigateToFloor = (floor: number) => {
    if (containerRef.current) {
      const section = containerRef.current.children[floor] as HTMLElement;
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const newFloor = Math.round(scrollTop / sectionHeight);

      if (newFloor !== currentFloor && newFloor >= 0 && newFloor < 6) {
        setCurrentFloor(newFloor);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentFloor]);

  return (
    <div className="h-screen overflow-hidden">
      <Navbar currentFloor={currentFloor} onNavigate={navigateToFloor} />
      <FloorIndicator
        currentFloor={currentFloor}
        totalFloors={6}
        onFloorClick={navigateToFloor}
        floorLabels={floorLabels}
      />

      <div
        ref={containerRef}
        className="snap-container"
      >
        <HeroSection onNavigate={navigateToFloor} />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <PartnersSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
