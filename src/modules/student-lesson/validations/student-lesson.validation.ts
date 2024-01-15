// Generate code from clean architecture template

import * as yup from 'yup';

export class StudentLessonValidation {
  static createValidationSchema = () =>
    yup.object().shape({
      // todo
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
