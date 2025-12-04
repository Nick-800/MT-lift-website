import { useState, useEffect } from "react";
import { Menu, X, ChevronUp } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface NavbarProps {
  currentFloor: number;
  onNavigate: (floor: number) => void;
}

const Navbar = ({ currentFloor, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", floor: 0 },
    { label: "Services", floor: 1 },
    { label: "About", floor: 2 },
    { label: "Projects", floor: 3 },
    { label: "Contact", floor: 4 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-card/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(0)}>
          <img src={logo} alt="El Masar El Thabet" className="h-12 w-auto" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary leading-tight">El Masar El Thabet</h1>
            <p className="text-xs text-muted-foreground font-arabic">المسار الثابت للمصاعد</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.floor}
              onClick={() => onNavigate(item.floor)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                currentFloor === item.floor
                  ? "bg-secondary text-secondary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Floor Display */}
        <div className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg">
          <ChevronUp className="w-4 h-4" />
          <span className="font-bold">Floor {currentFloor + 1}</span>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg bg-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-md shadow-lg border-t border-border">
          {navItems.map((item) => (
            <button
              key={item.floor}
              onClick={() => {
                onNavigate(item.floor);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-6 py-4 text-left font-medium transition-all duration-300 border-b border-border/50",
                currentFloor === item.floor
                  ? "bg-secondary/10 text-secondary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              Floor {item.floor + 1} - {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
