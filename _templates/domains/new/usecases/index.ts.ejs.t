---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/usecases/index.ts
---
export * from './create.usecase';
export * from './find-all.usecase';
