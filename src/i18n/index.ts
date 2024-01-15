import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from '@/config';
import commonEn from '@/i18n/locales/en/common.json';
import commonVi from '@/i18n/locales/vi/common.json';
import courseEn from '@/i18n/locales/en/course/course.json';
import courseVi from '@/i18n/locales/vi/course/course.json';
import lessonEn from '@/i18n/locales/en/lesson/lesson.json';
import lessonVi from '@/i18n/locales/vi/lesson/lesson.json';
import supportEn from '@/i18n/locales/en/support/support.json';
import supportVi from '@/i18n/locales/vi/support/support.json';

const resources = {
  en: {
    common: commonEn,
    course: courseEn,
    lesson: lessonEn,
    support: supportEn,
  },
  vi: {
    common: commonVi,
    course: courseVi,
    lesson: lessonVi,
    support: supportVi,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: config.i18n.VI,
    fallbackLng: config.i18n.VI,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
