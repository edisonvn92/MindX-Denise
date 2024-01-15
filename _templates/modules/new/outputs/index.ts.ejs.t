---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/outputs/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.output';
