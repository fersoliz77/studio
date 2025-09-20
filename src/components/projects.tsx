import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ProjectCard } from "./project-card";

const projectKeys = ["project1", "project2"];

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

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 }}}
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
          {projectKeys.map((key) => (
            <ProjectCard key={key} projectKey={key} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
