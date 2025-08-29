'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { useEffect, useRef } from 'react';
import { getOptions } from '@/i18n/config';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Pointer } from '@/components/pointer';

interface I18nProviderClientProps {
  children: React.ReactNode;
  lang: string;
  resources: Record<string, any>; // Resources from SSR
}

export function I18nProviderClient({ children, lang, resources }: I18nProviderClientProps) {
  const i18nRef = useRef<any>(null);

  if (!i18nRef.current) {
    i18nRef.current = createInstance();
    i18nRef.current
      .use(Backend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        ...getOptions(lang), // Initial language from server
        resources: resources, // Hydrate with server-fetched resources
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
          order: ['path', 'htmlTag', 'cookie', 'navigator'],
          caches: ['cookie'],
          lookupCookie: 'i18next',
          lookupFromPathIndex: 0,
        },
      });
  }

  useEffect(() => {
    if (i18nRef.current.language !== lang) {
      i18nRef.current.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <I18nextProvider i18n={i18nRef.current}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
        <Pointer />
      </ThemeProvider>
    </I18nextProvider>
  );
}
