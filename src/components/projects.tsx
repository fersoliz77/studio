import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./project-card";
import { Button } from "@/components/ui/button";

const projectKeys = ["project1", "project2", "project3"];

export function Projects() {
  const { t } = useTranslation();
  const [activeProject, setActiveProject] = useState(projectKeys[0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('projects.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('projects.description')}</p>
        </motion.div>

        {/* Mobile Tab Selector */}
        <div className="md:hidden mb-8">
          <div className="flex justify-center bg-muted p-1 rounded-md">
            {projectKeys.map((key) => (
              <Button
                key={key}
                variant={activeProject === key ? "default" : "ghost"}
                className="flex-1 transition-all duration-300"
                onClick={() => setActiveProject(key)}
              >
                {t(`projects.${key}.title`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard projectKey={activeProject} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectKeys.map((key) => (
            <motion.div key={key} variants={cardVariants}>
              <ProjectCard projectKey={key} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
