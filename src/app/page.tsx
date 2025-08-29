'use client';

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { ScrollAnimation } from "@/components/scroll-animation";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 relative overflow-x-hidden">
        <div className="absolute inset-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <ScrollAnimation>
          <Hero />
        </ScrollAnimation>
        <ScrollAnimation>
           <Skills />
        </ScrollAnimation>
        <ScrollAnimation>
          <Projects />
        </ScrollAnimation>
        <ScrollAnimation>
          <Contact />
        </ScrollAnimation>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Jane Doe. {t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
