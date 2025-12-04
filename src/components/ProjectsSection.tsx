import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

// Default projects - these would be replaced by data from admin
const defaultProjects = [
  {
    id: 1,
    title: "Luxury Residential Tower",
    category: "Residential",
    description: "Premium passenger elevators with custom interiors for a 25-floor luxury apartment complex.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Commercial Business Center",
    category: "Commercial",
    description: "High-speed elevators installed in a modern 40-story office building.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Medical Center",
    category: "Healthcare",
    description: "Specialized hospital elevators with stretcher accommodation and emergency features.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Shopping Mall Complex",
    category: "Retail",
    description: "Panoramic glass elevators and escalators for a major shopping destination.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
  },
];

const ProjectsSection = () => {
  // In a real app, this would fetch from a database
  const projects = defaultProjects;

  return (
    <section className="elevator-section bg-muted/30 relative">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse portfolio of elevator installations across various sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl cursor-pointer",
                "transform transition-all duration-500 hover:shadow-2xl"
              )}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <span className="inline-block px-3 py-1 bg-secondary/80 rounded-full text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Hover Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <ExternalLink className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
