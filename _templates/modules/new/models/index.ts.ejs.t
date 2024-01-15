---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/models/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.model';
