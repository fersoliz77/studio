import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import React, { lazy, Suspense, useState } from 'react';
import { Badge } from "./ui/badge";
import { FaLaptopCode } from 'react-icons/fa';

// Dynamic import for icons
const iconImports: { [key: string]: () => Promise<{ [key: string]: React.ElementType }> } = {
  'FaHtml5': () => import('react-icons/fa').then(module => ({ default: module.FaHtml5 })),
  'FaCss3Alt': () => import('react-icons/fa').then(module => ({ default: module.FaCss3Alt })),
  'FaJs': () => import('react-icons/fa').then(module => ({ default: module.FaJs })),
  'SiFlutter': () => import('react-icons/si').then(module => ({ default: module.SiFlutter })),
  'SiNextdotjs': () => import('react-icons/si').then(module => ({ default: module.SiNextdotjs })),
  'SiAngular': () => import('react-icons/si').then(module => ({ default: module.SiAngular })),
  'SiTailwindcss': () => import('react-icons/si').then(module => ({ default: module.SiTailwindcss })),
  'SiFramer': () => import('react-icons/si').then(module => ({ default: module.SiFramer })),
  'SiFirebase': () => import('react-icons/si').then(module => ({ default: module.SiFirebase })),
  'FaPython': () => import('react-icons/fa').then(module => ({ default: module.FaPython })),
  'SiStripe': () => import('react-icons/si').then(module => ({ default: module.SiStripe })),
  'FaKey': () => import('react-icons/fa').then(module => ({ default: module.FaKey })),
  'MdOutlineDesignServices': () => import('react-icons/md').then(module => ({ default: module.MdOutlineDesignServices })),
  'FaPalette': () => import('react-icons/fa').then(module => ({ default: module.FaPalette })),
  'MdLanguage': () => import('react-icons/md').then(module => ({ default: module.MdLanguage })),
  'FaSearch': () => import('react-icons/fa').then(module => ({ default: module.FaSearch })),
  'MdCompareArrows': () => import('react-icons/md').then(module => ({ default: module.MdCompareArrows })),
  'FaChartBar': () => import('react-icons/fa').then(module => ({ default: module.FaChartBar })),
  'FaMapMarkerAlt': () => import('react-icons/fa').then(module => ({ default: module.FaMapMarkerAlt })),
  'MdGpsFixed': () => import('react-icons/md').then(module => ({ default: module.MdGpsFixed })),
  'FaBell': () => import('react-icons/fa').then(module => ({ default: module.FaBell })),
  'FaGitAlt': () => import('react-icons/fa').then(module => ({ default: module.FaGitAlt })),
  'SiVercel': () => import('react-icons/si').then(module => ({ default: module.SiVercel })),
  'SiGithubactions': () => import('react-icons/si').then(module => ({ default: module.SiGithubactions })),
  'SiPwa': () => import('react-icons/si').then(module => ({ default: module.SiPwa })),
  'FaGlobe': () => import('react-icons/fa').then(module => ({ default: module.FaGlobe })),
  'FaNetworkWired': () => import('react-icons/fa').then(module => ({ default: module.FaNetworkWired })),
  // Soft Skill Icons
  'FaPuzzlePiece': () => import('react-icons/fa').then(module => ({ default: module.FaPuzzlePiece })),
  'FaComments': () => import('react-icons/fa').then(module => ({ default: module.FaComments })),
  'FaUsers': () => import('react-icons/fa').then(module => ({ default: module.FaUsers })),
  'FaSyncAlt': () => import('react-icons/fa').then(module => ({ default: module.FaSyncAlt })),
  'FaUserTie': () => import('react-icons/fa').then(module => ({ default: module.FaUserTie })),
  'FaBrain': () => import('react-icons/fa').then(module => ({ default: module.FaBrain })),
  'FaLightbulb': () => import('react-icons/fa').then(module => ({ default: module.FaLightbulb })),
  'FaClock': () => import('react-icons/fa').then(module => ({ default: module.FaClock })),
  'FaHeart': () => import('react-icons/fa').then(module => ({ default: module.FaHeart })),
  'FaRocket': () => import('react-icons/fa').then(module => ({ default: module.FaRocket })),
};

const iconComponentsMap: { [key: string]: React.LazyExoticComponent<React.ElementType> } = {
  'HTML': lazy(iconImports.FaHtml5),
  'CSS': lazy(iconImports.FaCss3Alt),
  'JavaScript': lazy(iconImports.FaJs),
  'Flutter/Dart': lazy(iconImports.SiFlutter),
  'React/Next.js': lazy(iconImports.SiNextdotjs),
  'Angular': lazy(iconImports.SiAngular),
  'Tailwind': lazy(iconImports.SiTailwindcss),
  'Motion/Framer': lazy(iconImports.SiFramer),
  'Firebase (Auth, Firestore, FCM)': lazy(iconImports.SiFirebase),
  'Python': lazy(iconImports.FaPython),
  'Integración de pagos/Stripe': lazy(iconImports.SiStripe),
  'Payments/Stripe': lazy(iconImports.SiStripe),
  'Auth/JWT': lazy(iconImports.FaKey),
  'Design Systems': lazy(iconImports.MdOutlineDesignServices),
  'UX/UI': lazy(iconImports.FaPalette),
  'Prototipado rápido': lazy(iconImports.MdOutlineDesignServices),
  'Rapid prototyping': lazy(iconImports.MdOutlineDesignServices),
  'i18n': lazy(iconImports.MdLanguage),
  'SEO': lazy(iconImports.FaSearch),
  'A/B testing': lazy(iconImports.MdCompareArrows),
  'Analytics': lazy(iconImports.FaChartBar),
  'Maps/GPS': lazy(iconImports.FaMapMarkerAlt),
  'Geofencing': lazy(iconImports.MdGpsFixed),
  'Notificaciones push': lazy(iconImports.FaBell),
  'Push notifications': lazy(iconImports.FaBell),
  'CI/CD': lazy(iconImports.FaGitAlt),
  'Vercel': lazy(iconImports.SiVercel),
  'GitHub Actions': lazy(iconImports.SiGithubactions),
  'PWA': lazy(iconImports.SiPwa),
  'Web3 (en exploración aplicada)': lazy(iconImports.FaGlobe),
  'Web3 (applied exploration)': lazy(iconImports.FaGlobe),
  'DAO / Tokenomics': lazy(iconImports.FaNetworkWired),
};

const softSkillIconsMap: { [key: string]: React.LazyExoticComponent<React.ElementType> } = {
  "problemSolving": lazy(iconImports.FaPuzzlePiece),
  "communication": lazy(iconImports.FaComments),
  "teamwork": lazy(iconImports.FaUsers),
  "adaptability": lazy(iconImports.FaSyncAlt),
  "leadership": lazy(iconImports.FaUserTie),
  "criticalThinking": lazy(iconImports.FaBrain),
  "creativity": lazy(iconImports.FaLightbulb),
  "timeManagement": lazy(iconImports.FaClock),
  "empathy": lazy(iconImports.FaHeart),
  "proactivity": lazy(iconImports.FaRocket),
};


const NEUTRAL_ICON_COLOR = '#607d8b';

const iconColors: { [key: string]: string } = {
  'HTML': '#E34F26',
  'CSS': '#1572B6',
  'JavaScript': '#F7DF1E',
  'Flutter/Dart': '#02569B',
  'React/Next.js': '#000000',
  'Angular': '#DD0031',
  'Tailwind': '#06B6D4',
  'Motion/Framer': '#0055FF',
  'Firebase (Auth, Firestore, FCM)': '#FFCA28',
  'Python': '#3776AB',
  'Integración de pagos/Stripe': '#635BFF',
  'Payments/Stripe': '#635BFF',
  'Maps/GPS': '#4285F4',
  'Vercel': '#000000',
  'GitHub Actions': '#2088FF',
};


const CategoryTitle = ({ title }: { title: string }) => {
  const parts = title.split('&').map(part => part.trim());
  return (
    <div className="text-center md:text-left text-2xl font-semibold leading-tight">
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && <div className="font-light text-muted-foreground">&</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const ScrollingBanner = ({ children, duration }: { children: React.ReactNode, duration: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const marqueeVariants = {
    animate: {
      x: "-50.5%",
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div 
      className="scroller"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="scroller-inner"
        variants={marqueeVariants}
        animate={isHovered ? "paused" : "animate"}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};


export function Skills() {
  const { t } = useTranslation();

  const skillsCategories = t('skills.categories', { returnObjects: true }) as any;
  const softSkills = t('skills.softSkills', { returnObjects: true }) as any;

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

        <div className="space-y-8">
          {skillsCategories && Object.values(skillsCategories).map((category: any, index: number) => {
            const scrollDuration = category.items.length * 5;

            return (
              <motion.div
                key={index}
                className="flex flex-col md:flex-row items-center md:items-stretch gap-6 p-4 rounded-lg"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="w-full md:w-1/4 flex-shrink-0 flex items-center justify-center p-4">
                  <CategoryTitle title={category.title} />
                </div>
                <div className="w-full md:w-3/4">
                  <ScrollingBanner duration={scrollDuration}>
                    {category.items.map((skill: any, skillIndex: number) => {
                      const IconComponent = iconComponentsMap[skill.name] || FaLaptopCode;
                      const iconColor = iconColors[skill.name] || NEUTRAL_ICON_COLOR;

                      return (
                        <Card
                          key={skillIndex}
                          className="text-center transition-all duration-300 ease-in-out border border-transparent
                                     hover:-translate-y-2 hover:shadow-xl hover:shadow-fireBlue hover:border-fireBlue
                                     flex flex-col min-w-[120px] max-w-[120px] h-[120px] justify-between p-2"
                        >
                          <CardHeader className="flex-shrink-0 pt-4 pb-1">
                            <div className="mx-auto bg-card rounded-full h-12 w-12 flex items-center justify-center">
                              <Suspense fallback={<div className="h-6 w-6" />}>
                                <IconComponent className="h-6 w-6" style={{ color: iconColor }} />
                              </Suspense>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-center items-center py-1 px-2">
                            <CardTitle className="text-sm font-medium leading-tight text-center">{skill.name}</CardTitle>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </ScrollingBanner>
                </div>
              </motion.div>
            );
          })}
        </div>

        {softSkills && softSkills.items && softSkills.items.length > 0 && (
          <motion.div
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-headline mb-8">{softSkills.title}</h3>
            <ScrollingBanner duration={softSkills.items.length * 6}>
                {softSkills.items.map((skill: { key: string; name: string }, index: number) => {
                  const IconComponent = softSkillIconsMap[skill.key];
                  return (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="whitespace-nowrap px-6 py-3 text-lg rounded-full shadow-sm 
                                 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                    >
                      {IconComponent && (
                        <Suspense fallback={<div className="h-4 w-4" />}>
                          <IconComponent className="h-4 w-4" />
                        </Suspense>
                      )}
                      {skill.name}
                    </Badge>
                  );
                })}
            </ScrollingBanner>
          </motion.div>
        )}
      </div>
    </section>
  );
}
