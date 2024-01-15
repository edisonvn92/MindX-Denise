---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/validations/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.validation';
