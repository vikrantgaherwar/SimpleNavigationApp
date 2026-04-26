const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('./schema');

const PORT = process.env.PORT || 4000;

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Server running at ${url}`);
};

startApolloServer().catch(err => {
  console.error('Failed to start GraphQL server:', err);
  process.exit(1);
});
