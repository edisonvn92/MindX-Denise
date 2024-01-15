---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/inputs/<%= h.inflection.dasherize(name.toLowerCase()) %>.input.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface Create<%= Name %>Input {
  // todo
}

export interface Update<%= Name %>Input {
  // todo
}
