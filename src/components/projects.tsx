import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Mobile Banking App Redesign",
    description: "A complete redesign of a mobile banking app, focusing on improving user flow and accessibility.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["UX Design", "UI Design", "Figma", "Accessibility"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "mobile banking app redesign"
  },
  {
    title: "E-commerce Platform UX Research",
    description: "Conducted user research to identify pain points and opportunities for improvement in an e-commerce platform.",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["UX Research", "User Interviews", "Usability Testing"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "e-commerce user research"
  },
  {
    title: "SaaS Dashboard Design System",
    description: "Developed a comprehensive design system for a SaaS dashboard to ensure consistency and scalability.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Design System", "UI Components", "Figma"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "saas dashboard design system"
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My Work</h2>
          <p className="text-lg text-muted-foreground mt-2">A selection of my UX/UI design projects.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Card
              key={project.title}
              className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl group"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <CardHeader className="p-0 relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48"
                  data-ai-hint={project.aiHint}
                />
              </CardHeader>
              <CardContent className="flex-1 p-6 space-y-4">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Case Study
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Figma File
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
