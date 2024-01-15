---
to: src/modules/<%= h.inflection.dasherize(name.toLowerCase()) %>/viewmodels/<%= h.inflection.dasherize(name.toLowerCase()) %>.viewmodel.ts
---
// Generate code from clean architecture template
<%
 Name = h.inflection.camelize(name),
 package = h.inflection.dasherize(name.toLowerCase())
%>
import { <%= Name %>HttpRepository } from '../adapters/repositories';
import { Query<%= Name %>Payload } from '@domains/<%= package %>/ports/payloads';
import { FindAll<%= Name %>Usecase } from '@domains/<%= package %>/usecases';

export default function <%= Name %>ViewModel() {
  const findAllUC = new FindAll<%= Name %>Usecase(new <%= Name %>HttpRepository());

  const actionGetAll = (payload?: Query<%= Name %>Payload) => {
    // todo
  };
}
