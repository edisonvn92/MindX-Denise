// Generate code from clean architecture template

import * as yup from 'yup';

export class LessonValidation {
  static createValidationSchema = () =>
    yup.object().shape({
      lesson: yup.object().shape({}),
      pages: yup.array(),
    });

  static updateValidationSchema = () =>
    yup.object().shape({
      // todo
    });

  static queryValidationSchema = () =>
    yup.object().nullable().shape({
      // todo
    });
}
