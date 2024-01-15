// Generate code from clean architecture template

import i18next from 'i18next';
import * as yup from 'yup';

export class CourseValidation {
  static courseValidationSchema = () =>
    yup.object({
      code: yup.string().required(i18next.t('course:codeRequired')),
      name: yup.string().required(i18next.t('course:nameRequired')),
      thumbnail: yup.string().required(i18next.t('course:thumbnailRequired')),
    });
}
