'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast'; // Import the toast hook
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const { toast } = useToast();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'es' : 'en';

    // Update the client-side i18n instance immediately.
    i18n.changeLanguage(newLang);

    // Show a toast notification about the language change
    toast({
      variant: "languageChange", // Use the new variant
      title: i18n.t('toast.languageChanged.title'),
      description: i18n.t('toast.languageChanged.description', { lang: newLang.toUpperCase() }),
      duration: 3000,
    });
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={i18n.language === 'en' ? 'en_text' : 'es_text'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="h-full w-full flex items-center justify-center"
        >
          <span className="font-bold text-sm">
            {i18n.language === 'en' ? 'ES' : 'EN'}
          </span>
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}
