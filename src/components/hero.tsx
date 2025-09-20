'use client';
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/store/scroll-store';
import { FaWhatsapp, FaDownload, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export function Hero() {
  const { t } = useTranslation();
  const { setIsHeroImageVisible } = useScrollStore();

  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the image is visible
  });

  // Combine refs
  const setRefs = (node: any) => {
    ref.current = node;
    inViewRef(node);
  };

  useEffect(() => {
    setIsHeroImageVisible(inView);
  }, [inView, setIsHeroImageVisible]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="hero" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={setRefs}
            className="flex flex-col items-center md:order-last" // Add flex-col and items-center for vertical alignment
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-50" />
              <motion.div layoutId="profile-picture">
                <Image
                  src="/profile.png"
                  alt={t('hero.name') || 'Profile Picture'} // Fallback alt text
                  width={400}
                  height={400}
                  className="rounded-full object-cover shadow-lg border-4 border-background relative"
                  priority
                />
              </motion.div>
            </div>
            {/* New Badge for small screens, displayed below the image */}
            <motion.div variants={itemVariants} className="md:hidden mt-4">
              <Badge variant="secondary">{t('hero.badge')}</Badge>
            </motion.div>
          </motion.div>
          <motion.div
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Existing Badge for medium and larger screens */}
            <motion.div variants={itemVariants} className="hidden md:block">
              <Badge variant="secondary">{t('hero.badge')}</Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-balance"
              variants={itemVariants}
            >
              {t('hero.tagline')}
            </motion.h1>
            <motion.p
              className="text-lg text-muted-foreground"
              variants={itemVariants}
            >
              {t('hero.description')}
            </motion.p>
            <motion.p
              className="text-sm text-muted-foreground mt-2"
              variants={itemVariants}
            >
              {t('hero.secondaryDescription')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
              variants={itemVariants}
            >
              <Button
                asChild
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:shadow-fireBlue hover:shadow-lg"
              >
                <a href="https://wa.me/5491160390824" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" />
                  {t('hero.contact')}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="transition-all duration-300 hover:scale-105 hover:border-fireBlue hover:shadow-fireBlue hover:shadow-lg"
              >
                <a href="/resume.pdf" download>
                  <FaDownload className="mr-2 h-5 w-5" />
                  {t('hero.download')}
                </a>
              </Button>
            </motion.div>
            <motion.div
              className="flex gap-4 justify-center md:justify-start pt-6"
              variants={itemVariants}
            >
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="h-8 w-8" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedinIn className="h-8 w-8" />
              </a>
            </motion.div>
            <motion.div
              className="flex gap-2 justify-center md:justify-start pt-4"
              variants={itemVariants}
            >
              <Badge variant="outline" className="text-xs px-2 py-1">{t('hero.tag1')}</Badge>
              <Badge variant="outline" className="text-xs px-2 py-1">{t('hero.tag2')}</Badge>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}