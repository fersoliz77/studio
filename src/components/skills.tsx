import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Users, Brain, Palette, PenTool, ClipboardCheck, LayoutTemplate,
  TabletSmartphone, Code, SwatchBook, Zap,
  Cloud, CreditCard, Key,
  Languages, Search, Split, BarChart,
  MapPin, LocateFixed, Bell,
  GitFork, Rocket, Github, LayoutPanelTop,
  Network,
} from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
}

interface SkillItem {
  key: string;
  icon: LucideIcon;
  categoryKey: string;
}

const allSkills: SkillItem[] = [
  // Frontend/Mobile
  { key: 'flutterDart', icon: TabletSmartphone, categoryKey: 'frontend_mobile' },
  { key: 'reactNext', icon: Code, categoryKey: 'frontend_mobile' },
  { key: 'tailwind', icon: SwatchBook, categoryKey: 'frontend_mobile' },
  { key: 'motionFramer', icon: Zap, categoryKey: 'frontend_mobile' },

  // Backend/Cloud
  { key: 'firebase', icon: Cloud, categoryKey: 'backend_cloud' },
  { key: 'stripePayments', icon: CreditCard, categoryKey: 'backend_cloud' },
  { key: 'authJwt', icon: Key, categoryKey: 'backend_cloud' },

  // Product & UX
  { key: 'designSystems', icon: LayoutTemplate, categoryKey: 'product_ux' },
  { key: 'uxUi', icon: Palette, categoryKey: 'product_ux' },
  { key: 'rapidPrototyping', icon: PenTool, categoryKey: 'product_ux' },
  { key: 'i18n', icon: Languages, categoryKey: 'product_ux' },
  { key: 'seo', icon: Search, categoryKey: 'product_ux' },
  { key: 'abTesting', icon: Split, categoryKey: 'product_ux' },
  { key: 'analytics', icon: BarChart, categoryKey: 'product_ux' },

  // Geo & Realtime
  { key: 'mapsGps', icon: MapPin, categoryKey: 'geo_realtime' },
  { key: 'geofencing', icon: LocateFixed, categoryKey: 'geo_realtime' },
  { key: 'pushNotifications', icon: Bell, categoryKey: 'geo_realtime' },

  // DevOps
  { key: 'cicd', icon: GitFork, categoryKey: 'devops' },
  { key: 'vercel', icon: Rocket, categoryKey: 'devops' },
  { key: 'githubActions', icon: Github, categoryKey: 'devops' },
  { key: 'pwa', icon: LayoutPanelTop, categoryKey: 'devops' },

  // Web3
  { key: 'daoTokenomics', icon: Network, categoryKey: 'web3' },
];

export function Skills() {
  const { t } = useTranslation();

  const skills: Skill[] = allSkills.map(skillItem => ({
    name: t(`skills.${skillItem.key}`),
    icon: skillItem.icon,
    category: t(`skills.${skillItem.categoryKey}`),
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">{t('skills.title')}</h2>
          <p className="text-lg text-muted-foreground mt-2">{t('skills.description')}</p>
        </motion.div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
            >
              <Card
                className="text-center transition-all duration-300 ease-in-out
                           hover:scale-105 hover:border-fireBlue
                           hover:shadow-fireBlue hover:shadow-lg"
              >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
