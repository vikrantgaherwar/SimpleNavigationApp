import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

// Configure the HTTP link to connect to your GraphQL server
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Update this URL based on your deployment
  credentials: 'include',
});

// Create an Apollo Link to handle request/response
const link = ApolloLink.from([httpLink]);

// Create the Apollo Client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default client;
