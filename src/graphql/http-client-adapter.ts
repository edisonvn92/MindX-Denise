import { Context, FetchPolicy, OperationVariables } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { initApolloClient } from './apollo-client';

export const getErrorMessage = (error: any) => {
  try {
    if (error.response) {
      return JSON.parse(error.response).message;
    }
    return error.message;
  } catch (err) {
    return error.toString();
  }
};
export interface MutateDataParams {
  mutation: DocumentNode;
  variables?: Record<string, unknown>;
  successMessage?: string;
}

export interface HttpClientAdapterParams {
  query: DocumentNode;
  variables?: OperationVariables;
  dataKey?: string;
  fetchPolicy?: FetchPolicy;
  context?: Context;
  notifyOnNetworkStatusChange?: boolean;
}

export class HttpClientAdapter {
  static async query<T>(params: HttpClientAdapterParams): Promise<T> {
    const apolloClient = await initApolloClient();
    const response = await apolloClient.query({
      query: params.query,
      variables: params.variables,
      fetchPolicy: params.fetchPolicy,
      context: params.context,
      notifyOnNetworkStatusChange: params.notifyOnNetworkStatusChange,
    });
    if (response.errors && response.errors.length > 0) {
      if (response.errors[0].message === 'NOT_ALLOW_REPORT_VIEW') {
        // navigateOnFailures(false, true);
      } else {
        throw new Error(getErrorMessage(response.errors[0]));
      }
    }
    return params.dataKey ? response.data[`${params.dataKey}`] : response.data;
  }

  static async mutate<T>({
    mutation,
    variables,
  }: {
    mutation: DocumentNode;
    variables?: OperationVariables;
  }): Promise<T> {
    const apolloClient = await initApolloClient();
    const response = await apolloClient.mutate<T>({
      mutation,
      variables,
    });
    if (response.errors && response.errors.length > 0) {
      if (response.errors[0].message === 'NOT_ALLOW_REPORT_VIEW') {
        // navigateOnFailures(false, true);
      }
    }
    const { data } = response;
    if (!data) {
      throw new Error('Not Found');
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as any)[`${(mutation.definitions[0] as any).name.value}`] || data;
    }
  }
}
