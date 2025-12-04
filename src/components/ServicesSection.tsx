import { Wrench, Shield, Zap, Building2, Clock, HeadphonesIcon, LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Building2,
    title: "Installation",
    description: "Complete elevator installation for residential, commercial, and industrial buildings.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Regular maintenance programs to keep your elevators running smoothly and safely.",
  },
  {
    icon: Zap,
    title: "Modernization",
    description: "Upgrade existing systems with the latest technology and improved efficiency.",
  },
  {
    icon: Shield,
    title: "Safety Audits",
    description: "Comprehensive inspections and certifications to meet all safety regulations.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock emergency response for any elevator issues.",
  },
  {
    icon: HeadphonesIcon,
    title: "Consultation",
    description: "Expert guidance to choose the right solution for your building.",
  },
];

const ServicesSection = () => {
  return (
    <section className="elevator-section bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Complete elevator solutions
          </h2>
          <p className="section-desc">
            From installation to maintenance, we handle every aspect of your elevator needs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <article
              key={index}
              className="card-elevated group"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 font-sans">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
