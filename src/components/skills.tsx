import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import React from 'react';
import { Badge } from "./ui/badge"; // Import Badge for soft skills

// Importar iconos de react-icons
import { FaReact, FaGithub, FaCloud, FaMoneyBillWave, FaKey, FaChartBar, FaMapMarkerAlt, FaBell, FaGitAlt, FaRocket, FaLaptopCode, FaProjectDiagram, FaGlobe, FaSearch, FaPalette, FaToolbox, FaNetworkWired } from 'react-icons/fa';
import { SiFlutter, SiNextdotjs, SiTailwindcss, SiFramer, SiFirebase, SiStripe, SiVercel, SiGithubactions, SiPwa } from 'react-icons/si';
import { MdOutlineDesignServices, MdLanguage, MdGpsFixed, MdCompareArrows } from 'react-icons/md';
import { DiDart } from 'react-icons/di';

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  color?: string; // Nuevo: color opcional para el icono
}

interface SkillItem {
  key: string;
  icon: React.ElementType;
  categoryKey: string;
  color?: string; // Nuevo: color opcional para el icono
}

const NEUTRAL_ICON_COLOR = '#607d8b'; // Un gris azulado para iconos genéricos

const allSkills: SkillItem[] = [
  // Frontend/Mobile
  { key: 'flutterDart', icon: SiFlutter, categoryKey: 'frontend_mobile', color: '#02569B' }, // Flutter Blue
  { key: 'reactNext', icon: SiNextdotjs, categoryKey: 'frontend_mobile', color: '#000000' }, // Next.js Black
  { key: 'tailwind', icon: SiTailwindcss, categoryKey: 'frontend_mobile', color: '#06B6D4' }, // Tailwind Cyan
  { key: 'motionFramer', icon: SiFramer, categoryKey: 'frontend_mobile', color: '#0055FF' }, // Framer Blue

  // Backend/Cloud
  { key: 'firebase', icon: SiFirebase, categoryKey: 'backend_cloud', color: '#FFCA28' }, // Firebase Yellow
  { key: 'stripePayments', icon: SiStripe, categoryKey: 'backend_cloud', color: '#635BFF' }, // Stripe Violet
  { key: 'authJwt', icon: FaKey, categoryKey: 'backend_cloud', color: NEUTRAL_ICON_COLOR }, // Concepto, usar color neutro

  // Product & UX
  { key: 'designSystems', icon: MdOutlineDesignServices, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'uxUi', icon: FaPalette, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'rapidPrototyping', icon: FaToolbox, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'i18n', icon: MdLanguage, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'seo', icon: FaSearch, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'abTesting', icon: MdCompareArrows, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },
  { key: 'analytics', icon: FaChartBar, categoryKey: 'product_ux', color: NEUTRAL_ICON_COLOR },

  // Geo & Realtime
  { key: 'mapsGps', icon: FaMapMarkerAlt, categoryKey: 'geo_realtime', color: '#4285F4' }, // Google Maps Blue
  { key: 'geofencing', icon: MdGpsFixed, categoryKey: 'geo_realtime', color: NEUTRAL_ICON_COLOR },
  { key: 'pushNotifications', icon: FaBell, categoryKey: 'geo_realtime', color: NEUTRAL_ICON_COLOR },

  // DevOps
  { key: 'cicd', icon: FaGitAlt, categoryKey: 'devops', color: NEUTRAL_ICON_COLOR }, // Concepto, usar color neutro
  { key: 'vercel', icon: SiVercel, categoryKey: 'devops', color: '#000000' }, // Vercel Black (su color oficial)
  { key: 'githubActions', icon: SiGithubactions, categoryKey: 'devops', color: '#2088FF' }, // GitHub Actions Blue
  { key: 'pwa', icon: SiPwa, categoryKey: 'devops', color: NEUTRAL_ICON_COLOR },

  // Web3
  { key: 'daoTokenomics', icon: FaNetworkWired, categoryKey: 'web3', color: NEUTRAL_ICON_COLOR },
];

export function Skills() {
  const { t } = useTranslation();

  const skills: Skill[] = allSkills.map(skillItem => ({
    name: t(`skills.${skillItem.key}`),
    icon: skillItem.icon,
    category: t(`skills.${skillItem.categoryKey}`),
    color: skillItem.color,
  }));

  const softSkillsTitle = t('skills.softSkillsTitle');
  const softSkillsList = t('skills.softSkillsList', { returnObjects: true }) as string[];

  // Duplicate soft skills for continuous scrolling effect
  const duplicatedSoftSkills = [...softSkillsList, ...softSkillsList];

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

  // Animation for the soft skills scroll banner
  const scrollVariants = {
    animate: {
      x: ['0%', '-100%'], // Animate from 0% to -100% of its own width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 30, // Adjust duration for desired speed
          ease: 'linear',
        },
      },
    },
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
          viewport={{ once: true, amount: 0.5 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
            >
              <Card
                className="text-center transition-all duration-300 ease-in-out
                           hover:scale-105 hover:border-fireBlue
                           hover:shadow-fireBlue hover:shadow-lg flex flex-col min-h-[120px]"
              >
                <CardHeader className="flex-shrink-0 pt-6 pb-2">
                  <div className="mx-auto bg-card rounded-full h-16 w-16 flex items-center justify-center border border-border"> 
                    <skill.icon className="h-8 w-8" style={skill.color ? { color: skill.color } : {}} /> 
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center items-center py-2 px-4"> 
                  <CardTitle className="text-lg">{skill.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills Section */} 
        {softSkillsList.length > 0 && (
          <motion.div
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-headline mb-8">{softSkillsTitle}</h3>
            <div className="relative w-full overflow-hidden py-4">
              <motion.div
                className="flex flex-nowrap gap-4 min-w-full"
                variants={scrollVariants}
                animate="animate"
              >
                {duplicatedSoftSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="whitespace-nowrap px-6 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    {skill}
                  </Badge>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
