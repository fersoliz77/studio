import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const projectKeys = ["project1", "project2", "project3"];

const projectImages: { [key: string]: string } = {
  project1: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  project2: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  project3: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('projects.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('projects.description')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectKeys.map((key, i) => {
            const project = {
              title: t(`projects.${key}.title`),
              description: t(`projects.${key}.description`),
              tags: t(`projects.${key}.tags`, { returnObjects: true }),
              image: projectImages[key],
              liveUrl: "#",
              githubUrl: "#",
            };

            console.log(`Project ${key} tags:`, project.tags, `Is Array: ${Array.isArray(project.tags)}`);

            return (
              <Card
                key={project.title}
                className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl group animate-appear"
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
                  />
                </CardHeader>
                <CardContent className="flex-1 p-6 space-y-4">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.tags) && project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex gap-4">
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.caseStudy')}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> {t('projects.figmaFile')}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
