import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Github, Linkedin } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";

export function Hero() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary">{t('hero.badge')}</Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold font-headline tracking-tighter"
              variants={itemVariants}
            >
              {t('hero.name')}
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground"
              variants={itemVariants}
            >
              {t('hero.description')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
              variants={itemVariants}
            >
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <a href="#contact">{t('hero.contact')}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="transition-transform duration-300 hover:scale-105">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  {t('hero.download')}
                </a>
              </Button>
            </motion.div>
            <motion.div
              className="flex gap-4 justify-center md:justify-start pt-6"
              variants={itemVariants}
            >
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-8 w-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-8 w-8" />
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50" />
                <Image
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jane Doe"
                  width={400}
                  height={400}
                  className="rounded-full object-cover shadow-lg border-4 border-background relative"
                  data-ai-hint="professional headshot of a woman"
                  priority
                />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
