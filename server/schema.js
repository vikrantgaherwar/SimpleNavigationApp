const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String!
    items: [Item!]!
    item(id: ID!): Item
  }

  type Mutation {
    createItem(title: String!, description: String!): Item!
    updateItem(id: ID!, title: String, description: String): Item
    deleteItem(id: ID!): Boolean!
  }

  type Item {
    id: ID!
    title: String!
    description: String!
    price: Float
    createdAt: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL Server!',
    items: () => {
      return [
        {
          id: '1',
          title: 'Item 1',
          description: 'First item',
          price: 29.99,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Item 2',
          description: 'Second item',
          price: 39.99,
          createdAt: new Date().toISOString(),
        },
      ];
    },
    item: (_, { id }) => {
      const items = [
        {
          id: '1',
          title: 'Item 1',
          description: 'First item',
          price: 29.99,
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Item 2',
          description: 'Second item',
          price: 39.99,
          createdAt: new Date().toISOString(),
        },
      ];
      return items.find(item => item.id === id);
    },
  },
  Mutation: {
    createItem: (_, { title, description }) => ({
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      price: 0,
      createdAt: new Date().toISOString(),
    }),
    updateItem: (_, { id, title, description }) => ({
      id,
      title: title || 'Updated Item',
      description: description || 'Updated description',
      price: 0,
      createdAt: new Date().toISOString(),
    }),
    deleteItem: (_, { id }) => true,
  },
};

module.exports = { typeDefs, resolvers };
