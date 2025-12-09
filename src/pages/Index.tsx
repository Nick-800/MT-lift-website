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

    // Map to store current visible height of each section
    const visibleHeights = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;

        // Update visible heights for changed entries
        entries.forEach((entry) => {
          visibleHeights.set(entry.target, entry.isIntersecting ? entry.intersectionRect.height : 0);
        });

        // Find section with largest visible height
        let maxVisibleHeight = 0;
        let activeIndex = currentFloor;

        const children = Array.from(container.children);

        children.forEach((child, index) => {
          const height = visibleHeights.get(child) || 0;
          if (height > maxVisibleHeight) {
            maxVisibleHeight = height;
            activeIndex = index;
          }
        });

        // Only update if we have a clearly visible section (avoid flickering during fast scroll)
        if (maxVisibleHeight > 0 && activeIndex !== currentFloor && activeIndex >= 0 && activeIndex < 6) {
          setCurrentFloor(activeIndex);
        }
      },
      {
        root: container,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Granular updates
      }
    );

    Array.from(container.children).forEach((child) => {
      observer.observe(child);
    });

    return () => observer.disconnect();
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
