---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/entities/<%= h.inflection.dasherize(name.toLowerCase()) %>.entity.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface <%= Name %>Entity {}
