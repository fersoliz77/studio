import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    // Eliminamos la propiedad 'resources' de aquí para que las traducciones se carguen externamente.
    // La carga se manejará en el cliente a través de i18next-http-backend en I18nProviderClient.
  });

export default i18n;
