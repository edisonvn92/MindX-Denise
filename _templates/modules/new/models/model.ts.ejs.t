---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/models/<%= h.inflection.dasherize(name.toLowerCase()) %>.model.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface <%= Name %>Model {
  // todo
}
