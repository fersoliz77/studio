'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { getI18nClient } from '@/i18n/client'; // Import the client-side i18next instance

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

  // Get or create the singleton i18next client instance
  if (!i18nRef.current) {
    i18nRef.current = getI18nClient(lang, resources);
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
