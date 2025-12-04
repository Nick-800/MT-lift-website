import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

interface NavbarProps {
  currentFloor: number;
  onNavigate: (floor: number) => void;
}

const navItems = [
  { label: "Home", floor: 0 },
  { label: "Services", floor: 1 },
  { label: "About", floor: 2 },
  { label: "Projects", floor: 3 },
  { label: "Contact", floor: 4 },
];

const Navbar = ({ currentFloor, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (floor: number) => {
    onNavigate(floor);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav(0)} className="flex items-center gap-3">
            <img src={logo} alt="El Masar El Thabet" className="h-9 w-auto" />
            <span className="font-semibold text-sm hidden sm:block">El Masar El Thabet</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.floor}
                onClick={() => handleNav(item.floor)}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  currentFloor === item.floor
                    ? "text-secondary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <button
                key={item.floor}
                onClick={() => handleNav(item.floor)}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  currentFloor === item.floor
                    ? "text-secondary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
