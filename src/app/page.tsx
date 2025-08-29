import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 relative">
        <div className="absolute inset-0 top-0 h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="animate-fade-in">
          <Hero />
        </div>
        <div className="animate-fade-in [animation-delay:0.2s]">
           <Skills />
        </div>
        <div className="animate-fade-in [animation-delay:0.4s]">
          <Projects />
        </div>
        <div className="animate-fade-in [animation-delay:0.6s]">
          <Contact />
        </div>
      </main>
      <footer className="py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </footer>
    </div>
  );
}
