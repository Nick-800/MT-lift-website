import { CheckCircle, Award, Users, Building } from "lucide-react";

const features = [
  "Licensed and certified technicians",
  "Premium quality components",
  "Comprehensive warranty coverage",
  "Energy-efficient solutions",
  "Custom design options",
  "Rapid response time",
];

const AboutSection = () => {
  return (
    <section className="elevator-section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent" />
      
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">
              Your Trusted <span className="gradient-text">Elevator Partner</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              El Masar El Thabet has been a leading name in the elevator industry for over 15 years. 
              We specialize in providing top-tier elevator solutions that combine innovation, safety, 
              and reliability for buildings of all sizes.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our commitment to excellence and customer satisfaction has made us the preferred choice 
              for elevator installation and maintenance across the region.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Building, number: "500+", label: "Projects Completed", color: "from-primary to-secondary" },
              { icon: Users, number: "1000+", label: "Happy Clients", color: "from-secondary to-accent" },
              { icon: Award, number: "15+", label: "Years Experience", color: "from-accent to-secondary" },
              { icon: CheckCircle, number: "100%", label: "Safety Compliance", color: "from-secondary to-primary" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
