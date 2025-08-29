'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
// Removed useRouter, usePathname as navigation is being removed
import { useToast } from '@/hooks/use-toast'; // Import the toast hook

export function LanguageToggle() {
  const { i18n } = useTranslation();
  // Removed router and pathname hooks
  const { toast } = useToast();

  const toggleLanguage = () => {
    const currentLang = i18n.language;
    const newLang = currentLang === 'en' ? 'es' : 'en';

    // Removed: router.push(newPathname); This will likely reintroduce hydration issues.

    // Update the client-side i18n instance immediately.
    // Be aware that without a page reload, server-rendered content might not match.
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
      <span className="font-bold text-sm">
        {i18n.language === 'en' ? 'ES' : 'EN'}
      </span>
      <span className="sr-only">Toggle language</span>
    </Button>
  );
}
