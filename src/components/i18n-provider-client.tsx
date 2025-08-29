'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend'; // Importar el backend
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Pointer } from '@/components/pointer';

interface I18nProviderClientProps {
  children: React.ReactNode;
  lang: string;
}

// Asegurarse de que i18n no se inicialice varias veces si ya está en uso.
// Si ya hay un i18n corriendo, lo actualizamos, si no, lo inicializamos.
if (!i18n.isInitialized) {
  i18n
    .use(Backend) // Usar el backend HTTP para cargar traducciones
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false,
      },
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json', // Ruta para cargar los archivos de traducción
      },
      // Eliminar las traducciones incrustadas aquí
    });
}


export function I18nProviderClient({ children, lang }: I18nProviderClientProps) {
  // Set the language for i18n instance. This is crucial for consistency.
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <I18nextProvider i18n={i18n}>
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
