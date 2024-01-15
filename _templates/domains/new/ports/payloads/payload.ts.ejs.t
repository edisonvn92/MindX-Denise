---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/ports/payloads/<%= h.inflection.dasherize(name.toLowerCase()) %>.payload.ts
---
// Generate code from clean architecture template
/* eslint-disable @typescript-eslint/no-empty-interface */
<%
 Name = h.inflection.camelize(name)
%>
export interface Create<%= Name %>Payload {}
export interface Query<%= Name %>Payload {}
