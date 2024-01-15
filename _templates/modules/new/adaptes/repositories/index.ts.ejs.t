---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/adapters/repositories/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.http.repository';
