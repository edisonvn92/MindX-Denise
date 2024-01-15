---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/usecases/find-all.usecase.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name)
%>
import { <%= Name %>Entity } from '../entities';
import { Query<%= Name %>Payload } from '../ports/payloads';
import { <%= Name %>Repository } from '../ports/repositories';

export class FindAll<%= Name %>Usecase {
  constructor(private readonly repo: <%= Name %>Repository) {}

  async run(payload: Query<%= Name %>Payload): Promise<<%= Name %>Entity> {
    throw new Error('Method not implemented.');
  }
}
