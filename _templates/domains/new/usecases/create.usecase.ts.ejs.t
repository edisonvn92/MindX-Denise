---
to: src/domains/<%= h.inflection.dasherize(name.toLowerCase()) %>/usecases/create.usecase.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name)
%>
import { <%= Name %>Entity } from '../entities';
import { Create<%= Name %>Payload } from '../ports/payloads';
import { <%= Name %>Repository } from '../ports/repositories';

export class Create<%= Name %>Usecase {
  constructor(private readonly repo: <%= Name %>Repository) {}

  async run(payload: Create<%= Name %>Payload): Promise<<%= Name %>Entity> {
    throw new Error('Method not implemented.');
  }
}
