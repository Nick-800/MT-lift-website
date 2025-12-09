import { ExternalLink, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// IMPORT YOUR LOGOS HERE
// I noticed these files in your assets folder, so I've set them up for you!
import cibesLogo from "@/assets/Cibes.png";
import sumasaLogo from "@/assets/Sumasa.png";
import etGroupLogo from "@/assets/etgroup.png";

interface Partner {
    name: string;
    description: string;
    website: string;
    image?: string;
    icon?: LucideIcon;
}

const PartnersSection = () => {
    const partners: Partner[] = [
        {
            name: "Cibes Lift",
            // Using the imported image variable
            image: cibesLogo,
            description: "We are the exclusive agent and official distributer of Cibes Lift, a Swedish manufacturer of space-saving low-speed lifts in Libya.",
            website: "https://cibeslift.com/"
        },
        {
            name: "Sumasa",
            image: sumasaLogo,
            description: "We are an authorized agent and official distributor of Sumasa, a Spanish company that Specialized in the design and manufacture of elevators and components.",
            website: "https://e-sumasa.com/en"
        },
        {
            name: "ET Group",
            image: etGroupLogo,
            description: "Providing innovative vertical transportation solutions.",
            website: "https://etgroup.ly"
        },
    ];

    return (
        <section className="elevator-section">
            <div className="container mx-auto px-6 lg:px-12 py-16">
                <div className="max-w-2xl mb-12">
                    <div className="accent-bar" />
                    <span className="section-label">Collaboration</span>
                    <h2 className="section-title">
                        Our Trusted Partners
                    </h2>
                    <p className="section-desc">
                        Working together with industry leaders to deliver the best vertical transportation solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-card border border-border p-6 flex flex-col items-start hover:border-secondary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
                        >
                            {/* Logo Area */}
                            <div className="w-full h-24 rounded-lg bg-white flex items-center justify-center mb-6 px-4 py-4 border border-border/50 group-hover:border-secondary/20 transition-colors overflow-hidden">
                                {partner.image ? (
                                    <img
                                        src={partner.image}
                                        alt={`${partner.name} logo`}
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    partner.icon && <partner.icon className="w-8 h-8 text-secondary" />
                                )}
                            </div>

                            {/* Name */}
                            <h3 className="text-xl font-semibold mb-3 font-sans group-hover:text-primary transition-colors">
                                {partner.name}
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                                {partner.description}
                            </p>

                            {/* Button */}
                            <Button
                                variant="outline"
                                className="w-full group/btn"
                                asChild
                            >
                                <a href={partner.website} target="_blank" rel="noopener noreferrer">
                                    Visit Website
                                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
