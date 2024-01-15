---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/ports/repositories/<%= h.inflection.dasherize(name.toLowerCase()) %>.repository.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name)
%>
import { Create<%= Name %>Payload, Query<%= Name %>Payload } from '../payloads';
import { <%= Name %>Entity } from '../../entities';

export interface <%= Name %>Repository {
  create(payload: Create<%= Name %>Payload): Promise<<%= Name %>Entity>;
  findAll(payload: Query<%= Name %>Payload): Promise<<%= Name %>Entity[]>;
}
