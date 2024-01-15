---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/ports/repositories/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.repository';
