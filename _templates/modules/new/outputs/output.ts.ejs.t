---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/outputs/<%= h.inflection.dasherize(name.toLowerCase()) %>.output.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface <%= Name %>Output {
  // todo
}
