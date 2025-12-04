import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Luxury Residential Tower",
    category: "Residential",
    description: "Premium passenger elevators for a 25-floor luxury apartment complex.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Commercial Business Center",
    category: "Commercial",
    description: "High-speed elevators in a modern 40-story office building.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Medical Center",
    category: "Healthcare",
    description: "Specialized hospital elevators with stretcher accommodation.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Shopping Mall Complex",
    category: "Retail",
    description: "Panoramic glass elevators for a major shopping destination.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop",
  },
];

const ProjectsSection = () => {
  return (
    <section className="elevator-section bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-desc">
            A selection of elevator installations across various sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-xl bg-card cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground rounded text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-background mb-1 font-sans">
                  {project.title}
                </h3>
                <p className="text-background/70 text-sm">
                  {project.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-foreground" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
