import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code, Server, Brain, Palette, Users } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

const skills: Skill[] = [
  { name: 'React & Next.js', icon: Code, category: 'Frontend' },
  { name: 'TypeScript', icon: Code, category: 'Frontend' },
  { name: 'Tailwind CSS', icon: Palette, category: 'Frontend' },
  { name: 'Node.js', icon: Server, category: 'Backend' },
  { name: 'Express', icon: Server, category: 'Backend' },
  { name: 'MongoDB', icon: Server, category: 'Backend' },
  { name: 'Problem Solving', icon: Brain, category: 'Soft Skills' },
  { name: 'Teamwork', icon: Users, category: 'Soft Skills' },
  { name: 'Communication', icon: Users, category: 'Soft Skills' },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My Skills</h2>
          <p className="text-lg text-muted-foreground mt-2">A collection of my technical and soft skills.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card key={skill.name} className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center">
                  <skill.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg">{skill.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{skill.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
