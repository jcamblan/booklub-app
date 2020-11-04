import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import env from './constants';
import { useAuth } from 'hooks';
import { ApolloLink, Observable, fromPromise } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { refreshToken } from 'api/auth';

const GraphQLProvider = ({ children }) => {
  const { accessToken, onUpdate, onReset } = useAuth();

  const request = operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const requestLink = new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(oper => request(oper))
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) {
            handle.unsubscribe();
          }
        };
      }),
  );

  const client = new ApolloClient({
    defaultOptions: {
      query: {
        fetchPolicy: 'network-first',
        errorPolicy: 'all',
      },
    },
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, operation, forward }) => {
        if (
          (graphQLErrors || []).filter(
            ({ extensions }) => extensions?.code === 'Unauthorized',
          ).length > 0
        ) {
          return fromPromise(
            refreshToken().catch(error => {
              onReset();
            }),
          ).flatMap(({ data: { accessToken, refreshToken } }) => {
            onUpdate({ accessToken, refreshToken });
            operation.setContext({
              headers: {
                authorization: `Bearer ${accessToken}`,
              },
            });
            return forward(operation);
          });
        }
      }),
      onError(({ graphQLErrors, networkError, ...rest }) => {
        if (Boolean(graphQLErrors))
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
                locations,
              )}, Path: ${path}`,
            ),
          );

        if (Boolean(networkError)) {
          console.log(`[Network error]: ${networkError}`);
        }
      }),
      requestLink,
      createUploadLink({
        uri: `${env.API_BASE}/graphql`,
      }),
    ]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
