// src/hooks/use-locale.tsx
'use client';

import { useTranslation } from 'react-i18next';

export function useLocale() {
  const { i18n } = useTranslation();
  return i18n.language; // This will return the current language, e.g., 'en' or 'es'
}
