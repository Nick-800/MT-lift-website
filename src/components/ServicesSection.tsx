import { Wrench, Shield, Zap, Building2, Clock, HeadphonesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    icon: Building2,
    title: "Elevator Installation",
    description: "Complete installation services for residential, commercial, and industrial elevators with premium quality components.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Repair",
    description: "Regular maintenance programs and 24/7 emergency repair services to keep your elevators running smoothly.",
  },
  {
    icon: Zap,
    title: "Modernization",
    description: "Upgrade your existing elevators with the latest technology, improved efficiency, and modern aesthetics.",
  },
  {
    icon: Shield,
    title: "Safety Inspections",
    description: "Comprehensive safety audits and compliance certifications to ensure your elevators meet all regulations.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support and emergency response team ready to assist you anytime.",
  },
  {
    icon: HeadphonesIcon,
    title: "Consultation",
    description: "Expert consultation services to help you choose the right elevator solution for your building.",
  },
];

const ServicesSection = () => {
  return (
    <section className="elevator-section bg-muted/30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,hsl(var(--secondary)/0.03)_50%,transparent_51%)] bg-[length:100px_100%]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
            Complete Elevator <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From installation to maintenance, we provide comprehensive elevator services tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "glass-card p-6 group hover:shadow-xl transition-all duration-500",
                "hover:-translate-y-2 cursor-pointer"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
