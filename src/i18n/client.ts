import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getOptions } from './config';

let i18nClient: typeof i18next;

export function getI18nClient(lang: string, resources: Record<string, any>) {
  if (!i18nClient) {
    i18nClient = i18next.createInstance();
    i18nClient
      .use(initReactI18next)
      .init({
        ...getOptions(lang),
        resources: resources, // Use resources from SSR directly
        // No Backend or LanguageDetector needed if resources are provided from SSR
      });
  }
  return i18nClient;
}
