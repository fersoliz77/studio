import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
// Eliminamos la importación de initReactI18next aquí, ya que no es para el lado del servidor.
import { getOptions, languages } from './config';

const initI18next = async (lang: string, ns: string | string[] = 'translation') => {
  const i18nInstance = createInstance();
  await i18nInstance
    // Eliminamos .use(initReactI18next) del lado del servidor.
    .use(resourcesToBackend((language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)))
    .init(getOptions(lang, ns));
  return i18nInstance;
};

export async function useTranslation(lang: string, ns: string | string[] = 'translation', options = {}) {
  const i18nextInstance = await initI18next(lang, ns);
  return {
    t: i18nextInstance.getFixedT(lang, ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
