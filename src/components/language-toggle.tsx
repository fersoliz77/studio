'use client';

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
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
