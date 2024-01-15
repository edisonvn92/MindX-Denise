---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/adapters/repositories/<%= h.inflection.dasherize(name.toLowerCase()) %>.http.repository.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name),
 package = h.inflection.dasherize(name.toLowerCase())
%>
import { <%= Name %>Repository } from '@domains/<%= package %>/ports/repositories';

export class <%= Name %>HttpRepository implements <%= Name %>Repository {}
