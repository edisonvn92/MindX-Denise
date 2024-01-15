---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/adapters/dtos/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.dto';
