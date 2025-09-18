import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ExternalLink } from "lucide-react";
import { FaAndroid } from 'react-icons/fa';
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const projectKeys = ["project1", "project2"];

interface TimelineEvent {
  name: string;
  percentage: number;
}

interface ProjectData {
  title: string;
  status?: string;
  technologies?: string[];
  timeline_events?: TimelineEvent[];
  what?: string;
  problem?: string;
  solution?: string;
  role?: string;
  gtm?: string;
  goal?: string;
  demoUrl?: string;
  webUrl?: string;
  playStoreUrl?: string;
}

const ProjectInfoRow = ({ label, value }: { label: string, value?: string }) => {
  if (!value) return null;
  return (
    <div className="text-sm">
      <span className="font-semibold text-foreground">{label}:</span>
      <span className="text-muted-foreground ml-2">{value}</span>
    </div>
  );
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
          {projectKeys.map((key) => {
            const projectData = t(`projects.${key}`, { returnObjects: true }) as ProjectData;

            return (
              <motion.div
                key={key}
                variants={itemVariants}
              >
                <Card
                  className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl group animate-appear"
                >
                  <CardHeader className="p-0 relative h-[37.5rem] w-full">
                    {projectData.demoUrl && (
                      <iframe
                        src={projectData.demoUrl}
                        title={projectData.title as string}
                        className="w-full h-full border-0"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      ></iframe>
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
                    
                    {/* Professional Description Section */}
                    <div className="space-y-3 pt-2">
                      {projectData.what && (
                        <p className="text-base font-semibold text-foreground">{projectData.what}</p>
                      )}
                      <ProjectInfoRow label={t('common.problem')} value={projectData.problem} />
                      <ProjectInfoRow label={t('common.solution')} value={projectData.solution} />
                      <ProjectInfoRow label={t('common.role')} value={projectData.role} />
                      <ProjectInfoRow label={t('common.gtm')} value={projectData.gtm} />
                      <ProjectInfoRow label={t('common.goal')} value={projectData.goal} />
                    </div>

                    {projectData.timeline_events && projectData.timeline_events.length > 0 && (
                      <div className="timeline-section pt-2">
                        <h4 className="text-lg font-semibold mb-3">{t('projects.timelineTitle')}</h4>
                        <div className="space-y-4">
                          {projectData.timeline_events.map((event, eventIndex) => (
                            <div key={eventIndex} className="flex items-center space-x-2">
                              <div className="w-1/3 text-sm text-muted-foreground">
                                {event.name}
                              </div>
                              <div className="w-2/3">
                                <Progress value={event.percentage} className="w-full" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-6 pt-0 flex gap-4">
                    {projectData.webUrl && (
                      <Button asChild>
                        <a href={projectData.webUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.webButton')}
                        </a>
                      </Button>
                    )}
                    {projectData.playStoreUrl && (
                      <Button asChild variant="outline">
                        <a href={projectData.playStoreUrl} target="_blank" rel="noopener noreferrer" className="android-button">
                          <FaAndroid className="mr-2 h-4 w-4" /> {t('projects.playStoreButton')}
                        </a>
                      </Button>
                    )}
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
