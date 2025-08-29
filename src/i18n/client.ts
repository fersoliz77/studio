import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { getOptions, languages } from './config';

const runsOnBrowser = typeof window !== 'undefined';

let clientI18nInstance: typeof i18next | null = null;

export function getI18nClient(lang: string, resources: Record<string, any>) {
  if (!clientI18nInstance) {
    clientI18nInstance = i18next.createInstance();
    clientI18nInstance
      .use(initReactI18next)
      .use(LanguageDetector)
      .use(Backend)
      .init({
        ...getOptions(lang),
        lng: lang,
        resources: resources, // Pass resources directly to init
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
          order: ['htmlTag', 'cookie', 'path', 'navigator'],
          caches: ['cookie'],
          lookupCookie: 'i18next',
          lookupFromPathIndex: 0,
        },
        preload: runsOnBrowser ? languages : [],
      });
  } else if (clientI18nInstance.language !== lang) {
    // If instance exists but language is different, change it
    clientI18nInstance.changeLanguage(lang);
  }

  return clientI18nInstance;
}
