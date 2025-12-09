import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Autoplay from "embla-carousel-autoplay";

// Project 1 Images
import p1_1 from "@/assets/projects/1/1.jpg";
import p1_2 from "@/assets/projects/1/2.jpg";
import p1_3 from "@/assets/projects/1/3.jpg";
import p1_4 from "@/assets/projects/1/4.jpg";
import p1_5 from "@/assets/projects/1/5.jpg";
import p1_6 from "@/assets/projects/1/6.jpg";
import p1_7 from "@/assets/projects/1/7.jpg";
import p1_8 from "@/assets/projects/1/8.jpg";
import p1_9 from "@/assets/projects/1/9.jpg";

// Project 2 Images
import p2_1 from "@/assets/projects/2/1.jpg";
import p2_2 from "@/assets/projects/2/2.jpg";
import p2_3 from "@/assets/projects/2/3.jpg";
import p2_4 from "@/assets/projects/2/4.jpg";

const projects = [
  {
    title: "Gardena Project – Barqa Holding Company",
    details: [
      { highlight: "16 Elevators installed", text: "" },
      { highlight: "9 weeks", text: "All works completed within 9 weeks — averaging one new elevator every 4 days." },
      { highlight: "", text: "A benchmark project that highlighted our efficiency and quality in the Libyan market." }
    ],
    images: [p1_1, p1_2, p1_3, p1_4, p1_5, p1_6, p1_7, p1_8, p1_9]
  },
  {
    title: "Al-Fateh University – Derna",
    details: [
      { highlight: "Status", text: "Work in Progress" },
      { highlight: "14 Elevators", text: "Comprehensive vertical transportation solution for the university campus." },
      { highlight: "Scope", text: "Currently executing the installation phase with a focus on safety and precision." },
      { highlight: "Goal", text: "Modernizing campus infrastructure to ensure reliable accessibility for students and staff." }
    ],
    images: [p2_1, p2_2, p2_3, p2_4]
  }
];

const additionalProjects = [
  { name: "Administrative Control Authority – Tobruk", detail: "1 Elevator" },
  { name: "Oil Institute – Tripoli (Tourism Department)", detail: "2 Panoramic Elevators" },
  { name: "Idris Al-Sanusi Library", detail: "1 Elevator" },
  { name: "Reconstruction & Development Fund – Derna", detail: "1 External Panoramic Elevator" },
  { name: "Al-Hazm Tourist Village – Zliten", detail: "1 Elevator" },
  { name: "Al-Aseel Water Factory – Bouhadi", detail: "1 Elevator" },
  { name: "15 October Hospital (Now Dar Al-Hikma)", detail: "1 Elevator" },
  { name: "Residential Projects", detail: "More than 50–60 elevators installed in residential projects, villas, and private compounds across various Libyan cities" },
];

const ProjectsSection = () => {
  return (
    <section className="min-h-screen w-full snap-start flex flex-col justify-start py-24 bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-desc">
            Highlighting our efficiency and quality in the Libyan market.
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Project Details */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold font-sans text-foreground">
                    {project.title}
                  </h3>

                  <div className="prose prose-lg text-muted-foreground">
                    <ul className="list-disc pl-5 space-y-3 marker:text-secondary">
                      {project.details.map((detail, i) => (
                        <li key={i}>
                          {detail.highlight && <strong className="text-foreground">{detail.highlight}</strong>}
                          {detail.highlight && detail.text && " — "}
                          {detail.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Project Slideshow */}
                <div className="w-full relative flex justify-center">
                  <Carousel
                    className="w-full max-w-sm"
                    plugins={[
                      Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                      }),
                    ]}
                    opts={{
                      loop: true,
                    }}
                  >
                    <CarouselContent>
                      {project.images.map((image, imgIndex) => (
                        <CarouselItem key={imgIndex}>
                          <div className="p-1">
                            <Card className="border-0 shadow-none bg-transparent">
                              <CardContent className="flex aspect-[3/4] items-center justify-center p-0 overflow-hidden rounded-xl bg-muted/20">
                                <img
                                  src={image}
                                  alt={`${project.title} view ${imgIndex + 1}`}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-none z-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background border-none z-10" />
                  </Carousel>
                </div>
              </div>

              {/* Separator between projects */}
              {index < projects.length - 1 && (
                <Separator className="mt-24 bg-border/40" />
              )}
            </div>
          ))}
        </div>

        {/* Additional Projects Section */}
        <div className="mt-24">
          <Separator className="mb-16 bg-border/40" />

          <div className="max-w-2xl mb-10">
            <h3 className="text-2xl font-bold font-sans text-foreground mb-4">
              Other Notable Installations
            </h3>
            <p className="text-muted-foreground">
              Delivering excellence across diverse sectors and locations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalProjects.map((project, index) => (
              <Card key={index} className="bg-card border-border/50 hover:border-secondary/30 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold font-sans text-lg mb-2 text-foreground/90">{project.name}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
