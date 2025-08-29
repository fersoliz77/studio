export const fallbackLng = 'en';
export const languages = [fallbackLng, 'es'];
export const defaultNS = 'translation';
export const ns = [defaultNS]; // Only 'translation' namespace is used currently

export function getOptions(lang = fallbackLng, namespace = defaultNS) {
  return {
    debug: false, // Set to true for debugging
    supportedLngs: languages,
    fallbackLng,
    lng: lang,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  };
}
