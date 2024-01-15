---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/validations/<%= h.inflection.dasherize(name.toLowerCase()) %>.validation.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name),
 package = h.inflection.dasherize(name.toLowerCase())
%>
import * as yup from 'yup';

export class <%= Name %>Validation {
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
