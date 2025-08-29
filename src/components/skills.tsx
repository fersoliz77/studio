import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, Brain, Palette, PenTool, ClipboardCheck, LayoutTemplate } from 'lucide-react';
import type { LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

const skills: Skill[] = [
  { name: 'User Research', icon: Users, category: 'UX Research' },
  { name: 'Usability Testing', icon: ClipboardCheck, category: 'UX Research' },
  { name: 'Information Architecture', icon: Brain, category: 'UX Design' },
  { name: 'Wireframing', icon: LayoutTemplate, category: 'UX Design' },
  { name: 'Prototyping', icon: PenTool, category: 'UX Design' },
  { name: 'UI Design', icon: Palette, category: 'UI Design' },
  { name: 'Design Systems', icon: Palette, category: 'UI Design' },
  { name: 'Figma', icon: PenTool, category: 'Tools' },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">My UX/UI Expertise</h2>
          <p className="text-lg text-muted-foreground mt-2">Specializing in creating intuitive and user-centered digital experiences.</p>
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
