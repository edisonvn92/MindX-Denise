---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/viewmodels/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.viewmodel';
