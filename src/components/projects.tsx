import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with a modern UI, product management, and a secure checkout process.",
    image: "https://picsum.photos/600/400?random=1",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "online store"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with drag-and-drop functionality and real-time updates.",
    image: "https://picsum.photos/600/400?random=2",
    tags: ["React", "Firebase", "Zustand", "Shadcn UI"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "kanban board"
  },
  {
    title: "Portfolio Website",
    description: "This very portfolio website, built with Next.js and styled with Tailwind CSS, featuring an AI summary generator.",
    image: "https://picsum.photos/600/400?random=3",
    tags: ["Next.js", "Genkit", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    aiHint: "developer portfolio"
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My Projects</h2>
          <p className="text-lg text-muted-foreground mt-2">Here are some of the projects I've worked on.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.title} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <CardHeader className="p-0">
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
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> Source Code
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
