---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/entities/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.entity';
