---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/inputs/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.input';
