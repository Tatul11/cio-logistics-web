import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ru: () => import('@/dictionaries/ru.json').then((module) => module.default),
  hy: () => import('@/dictionaries/hy.json').then((module) => module.default),
};

export const getDictionary = async (locale: 'en' | 'ru' | 'hy') => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }
  return dictionaries[locale]();
};
