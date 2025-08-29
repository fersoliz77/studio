import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, Brain, Palette, PenTool, ClipboardCheck, LayoutTemplate } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

const skillIcons: { [key: string]: LucideIcon } = {
  userResearch: Users,
  usabilityTesting: ClipboardCheck,
  infoArchitecture: Brain,
  wireframing: LayoutTemplate,
  prototyping: PenTool,
  uiDesign: Palette,
  designSystems: Palette,
  figma: PenTool,
};

export function Skills() {
  const { t } = useTranslation();

  const skillKeys = [
    'userResearch', 'usabilityTesting', 'infoArchitecture', 'wireframing',
    'prototyping', 'uiDesign', 'designSystems', 'figma'
  ];

  const categoryKeys: { [key: string]: string } = {
    userResearch: 'uxResearch',
    usabilityTesting: 'uxResearch',
    infoArchitecture: 'uxDesign',
    wireframing: 'uxDesign',
    prototyping: 'uxDesign',
    uiDesign: 'uiDesign',
    designSystems: 'uiDesign',
    figma: 'tools',
  };

  const skills: Skill[] = skillKeys.map(key => ({
    name: t(`skills.${key}`),
    icon: skillIcons[key],
    category: t(`skills.categories.${categoryKeys[key]}`),
  }));

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('skills.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('skills.description')}</p>
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
