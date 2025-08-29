import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Github, Linkedin } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <Badge variant="secondary">{t('hero.badge')}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
              {t('hero.name')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Button asChild size="lg" className="transition-transform duration-300 hover:scale-105">
                <a href="#contact">{t('hero.contact')}</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="transition-transform duration-300 hover:scale-105">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  {t('hero.download')}
                </a>
              </Button>
            </div>
            <div className="flex gap-4 justify-center md:justify-start pt-6">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-8 w-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-8 w-8" />
              </a>
            </div>
          </div>
          <div className="flex justify-center animate-fade-in [animation-delay:0.2s]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
