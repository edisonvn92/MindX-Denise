import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

export class HttpDto<T> {
  constructor(
    private readonly data?: T | null,
    private readonly error?: ApolloError,
    private readonly errors?: ReadonlyArray<GraphQLError>,
    private readonly loading?: boolean,
  ) {}
}

export interface GraphQLDto<T> {
  data?: T | null;
  error?: ApolloError;
  errors?: ReadonlyArray<GraphQLError>;
  loading?: boolean;
}

// TODO NOT USED
