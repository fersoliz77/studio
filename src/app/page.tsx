import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-primary text-primary-foreground py-6 text-center">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </footer>
    </div>
  );
}
