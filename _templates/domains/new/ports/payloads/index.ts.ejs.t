---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/ports/payloads/index.ts
---
export * from './<%= h.inflection.dasherize(name.toLowerCase()) %>.payload';
