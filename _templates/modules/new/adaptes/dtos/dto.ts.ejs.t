---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/adapters/dtos/<%= h.inflection.dasherize(name.toLowerCase()) %>.dto.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface Create<%= Name %>Dto {
  // todo
}

export interface Update<%= Name %>Dto {
  // todo
}
