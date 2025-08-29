'use client';

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";

// Dynamically import components that are likely below the fold
const Skills = dynamic(() => import("@/components/skills"), { ssr: false });
const Projects = dynamic(() => import("@/components/projects").then(mod => mod.Projects), { ssr: false });
const Contact = dynamic(() => import("@/components/contact"), { ssr: false });

export default function Home() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]); // Adjust the 200 for more/less parallax

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 relative overflow-x-hidden">
        <motion.div
          className="absolute inset-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10"
          style={{ y }}
        />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fer Soliz. {t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
