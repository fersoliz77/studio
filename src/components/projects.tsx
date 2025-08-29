import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const projectKeys = ["project1", "project2"]; // Actualizado para incluir solo tus dos proyectos

const projectImages: { [key: string]: string } = {
  project1: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  project2: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export function Projects() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('projects.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('projects.description')}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projectKeys.map((key, i) => {
            const projectData = t(`projects.${key}`, { returnObjects: true }) as Record<string, string | string[]>;
            
            // Construir la descripción detallada del proyecto
            let detailedDescription = '';
            if (key === 'project1') { // Bajo Flores
              detailedDescription = `**${t(`projects.${key}.what`)}**\n\n` +
                                    `**${t(`common.problem`)}:** ${t(`projects.${key}.problem`)}\n
` +
                                    `**${t(`common.solution`)}:** ${t(`projects.${key}.solution`)}\n
` +
                                    `**${t(`common.role`)}:** ${t(`projects.${key}.role`)}\n
` +
                                    `**${t(`common.gtm`)}:** ${t(`projects.${key}.gtm`)}`;
            } else if (key === 'project2') { // KDT
              detailedDescription = `**${t(`projects.${key}.what`)}**\n\n` +
                                    `**${t(`common.role`)}:** ${t(`projects.${key}.role`)}\n
` +
                                    `**${t(`common.goal`)}:** ${t(`projects.${key}.goal`)}`;
            }

            return (
              <motion.div
                key={key}
                variants={itemVariants}
              >
                <Card
                  className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl group animate-appear"
                >
                  <CardHeader className="p-0 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
                    {projectImages[key] && (
                      <Image
                        src={projectImages[key]}
                        alt={projectData.title as string}
                        width={600}
                        height={400}
                        className="object-cover w-full h-48"
                      />
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 p-6 space-y-4">
                    <CardTitle className="text-xl">{projectData.title}</CardTitle>
                    {projectData.status && (
                      <Badge variant="secondary" className="mr-2">{projectData.status}</Badge>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(projectData.technologies as string[])?.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground whitespace-pre-line">{detailedDescription}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-4">
                    {/* Mantener botones de ejemplo, puedes adaptarlos con URLs reales de tus proyectos */}
                    <Button asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.caseStudy')}
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> {t('projects.figmaFile')}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
