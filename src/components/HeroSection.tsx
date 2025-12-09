import { ArrowRight, ChevronDown } from "lucide-react";
import Elevator3D from "./Elevator3D";

interface HeroSectionProps {
  onNavigate: (floor: number) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  return (
    <section className="elevator-section relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="animate-fade-up">
              <span className="section-label">Since 2015</span>
            </div>

            <h1 className="section-title animate-fade-up delay-100">
              Elevating buildings,{" "}
              <span className="text-secondary">elevating lives</span>
            </h1>

            <p className="section-desc animate-fade-up delay-200">
              We design and install elevator systems that combine reliability, 
              safety, and modern aesthetics. Your building deserves the best vertical 
              transportation.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-300">
              <button className="btn-primary" onClick={() => onNavigate(4)}>
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary" onClick={() => onNavigate(3)}>
                See Our Work
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-12 pt-8 border-t border-border animate-fade-up delay-400">
              <div>
                <div className="stat-number">200+</div>
                <div className="text-muted-foreground text-sm mt-1">Installations</div>
              </div>
              <div>
                <div className="stat-number">10+</div>
                <div className="text-muted-foreground text-sm mt-1">Years</div>
              </div>
              <div>
                <div className="stat-number">100%</div>
                <div className="text-muted-foreground text-sm mt-1">Safety</div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Elevator */}
          <div className="hidden lg:flex justify-center animate-fade-in delay-200">
            <Elevator3D />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button 
        onClick={() => onNavigate(1)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-secondary transition-colors"
      >
        <span className="text-xs tracking-wide">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
