import Image from "next/image";
import { Button } from "./ui/button";
import { Download, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-primary font-headline tracking-tighter">
              John Doe
            </h1>
            <p className="text-xl text-muted-foreground">
              A passionate Full Stack Developer building modern web applications with a focus on user experience and performance.
            </p>
            <div className="flex gap-4 justify-center md:justify-start pt-4">
              <Button asChild variant="default" size="lg">
                <a href="#contact">Contact Me</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-5 w-5" />
                  Resume
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
          <div className="flex justify-center">
            <Image
              src="https://picsum.photos/400/400"
              alt="John Doe"
              width={400}
              height={400}
              className="rounded-full object-cover shadow-lg border-4 border-primary"
              data-ai-hint="professional headshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
