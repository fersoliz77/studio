import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import React from 'react';
import { Badge } from "./ui/badge";

// Importar iconos de react-icons
import { FaLaptopCode, FaHtml5, FaCss3Alt, FaJs, FaPython, FaKey, FaPalette, FaSearch, FaChartBar, FaMapMarkerAlt, FaBell, FaGitAlt, FaGlobe, FaNetworkWired } from 'react-icons/fa';
import { SiFlutter, SiNextdotjs, SiTailwindcss, SiFramer, SiFirebase, SiStripe, SiVercel, SiGithubactions, SiPwa, SiAngular } from 'react-icons/si';
import { MdOutlineDesignServices, MdLanguage, MdGpsFixed, MdCompareArrows } from 'react-icons/md';

const NEUTRAL_ICON_COLOR = '#607d8b';

const iconComponents: { [key: string]: React.ElementType } = {
  'HTML': FaHtml5,
  'CSS': FaCss3Alt,
  'JavaScript': FaJs,
  'Flutter/Dart': SiFlutter,
  'React/Next.js': SiNextdotjs,
  'Angular': SiAngular,
  'Tailwind': SiTailwindcss,
  'Motion/Framer': SiFramer,
  'Firebase (Auth, Firestore, FCM)': SiFirebase,
  'Python': FaPython,
  'Integración de pagos/Stripe': SiStripe,
  'Payments/Stripe': SiStripe,
  'Auth/JWT': FaKey,
  'Design Systems': MdOutlineDesignServices,
  'UX/UI': FaPalette,
  'Prototipado rápido': MdOutlineDesignServices, 
  'Rapid prototyping': MdOutlineDesignServices,
  'i18n': MdLanguage,
  'SEO': FaSearch,
  'A/B testing': MdCompareArrows,
  'Analytics': FaChartBar,
  'Maps/GPS': FaMapMarkerAlt,
  'Geofencing': MdGpsFixed,
  'Notificaciones push': FaBell,
  'Push notifications': FaBell,
  'CI/CD': FaGitAlt,
  'Vercel': SiVercel,
  'GitHub Actions': SiGithubactions,
  'PWA': SiPwa,
  'Web3 (en exploración aplicada)': FaGlobe,
  'Web3 (applied exploration)': FaGlobe,
  'DAO / Tokenomics': FaNetworkWired,
};

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
  return (
    <div className="scroller" style={{ "--duration": `${duration}s` } as React.CSSProperties}>
      <div className="scroller-inner">
        {children}
        {children} 
      </div>
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
                      const IconComponent = iconComponents[skill.name] || FaLaptopCode;
                      const iconColor = iconColors[skill.name] || NEUTRAL_ICON_COLOR;

                      return (
                        <Card
                          key={skillIndex}
                          className="text-center transition-all duration-300 ease-in-out
                                     hover:scale-105 hover:border-fireBlue
                                     hover:shadow-fireBlue hover:shadow-lg flex flex-col min-w-[120px] max-w-[120px] h-[120px] justify-between p-2"
                        >
                          <CardHeader className="flex-shrink-0 pt-4 pb-1">
                            <div className="mx-auto bg-card rounded-full h-12 w-12 flex items-center justify-center border border-border">
                              <IconComponent className="h-6 w-6" style={{ color: iconColor }} />
                            </div>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-center items-center py-1 px-2">
                            <CardTitle className="text-sm font-medium leading-tight text-center">{skill.name}</CardTitle>
                          </Content>
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
                {softSkills.items.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary" className="whitespace-nowrap px-6 py-3 text-lg rounded-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    {skill}
                  </Badge>
                ))}
            </ScrollingBanner>
          </motion.div>
        )}
      </div>
    </section>
  );
}