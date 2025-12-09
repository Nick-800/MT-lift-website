import { Check } from "lucide-react";

const features = [
  "Licensed and certified technicians",
  "Premium quality components",
  "Comprehensive warranty",
  "Energy-efficient solutions",
  "Custom designs available",
  "Rapid response times",
];

const AboutSection = () => {
  return (
    <section className="elevator-section">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3">
            <div className="accent-bar" />
            <span className="section-label">About El Masar El Thabet</span>
            <h2 className="section-title">
              Your trusted partner in vertical transportation
            </h2>
            <div className="space-y-4 mt-6">
              <p className="text-muted-foreground leading-relaxed">
                In a world witnessing rapid urban development and a growing demand for safe and
                intelligent vertical transportation solutions, <strong className="text-foreground">El Masar El Thabet</strong> has emerged as a distinguished provider.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey began in Sweden in 2015, where we gained extensive hands-on experience working with leading global companies such
                as KONE and Schindler. In 2019, we expanded into the Libyan market, establishing
                our headquarters in Libya and bringing with us European technology and international
                standards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="card-elevated text-center py-8">
              <div className="stat-number">200+</div>
              <div className="text-muted-foreground text-sm mt-1">Projects Done</div>
            </div>
            <div className="card-elevated text-center py-8">
              <div className="stat-number">1000+</div>
              <div className="text-muted-foreground text-sm mt-1">Happy Clients</div>
            </div>
            <div className="card-elevated text-center py-8">
              <div className="stat-number">10+</div>
              <div className="text-muted-foreground text-sm mt-1">Years Active</div>
            </div>
            <div className="card-elevated text-center py-8">
              <div className="stat-number">100%</div>
              <div className="text-muted-foreground text-sm mt-1">Safety Record</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
