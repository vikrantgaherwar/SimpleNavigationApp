# GraphQL Integration Setup

This project now includes GraphQL support with Apollo Client and Apollo Server.

## Project Structure

```
server/
  ├── server.js          # GraphQL server entry point
  ├── schema.js          # GraphQL schema and resolvers
  └── package.json       # Server dependencies
apolloClient.js          # Apollo Client configuration
graphql/
  └── queries.js         # GraphQL queries, mutations, and custom hooks
```

## Getting Started

### 1. Install Dependencies

Install the main app dependencies:

```bash
npm install
```

Install server dependencies:

```bash
cd server
npm install
cd ..
```

### 2. Start the GraphQL Server

In a separate terminal, start the GraphQL server:

```bash
cd server
npm start
```

The server will run at `http://localhost:4000/graphql`

For development with auto-reload:

```bash
cd server
npm run dev
```

### 3. Run the React Native App

```bash
npm start
```

Then:

- For iOS: `npm run ios`
- For Android: `npm run android`

## Using GraphQL in Your Components

### Example: Fetching Items

```jsx
import { useGetItems } from './graphql/queries';

function Home() {
  const { data, loading, error } = useGetItems();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.items || []}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      keyExtractor={item => item.id}
    />
  );
}
```

### Example: Creating an Item

```jsx
import { useCreateItem } from './graphql/queries';

function CreateItemForm() {
  const [createItem] = useCreateItem();

  const handleCreate = async () => {
    await createItem({
      variables: {
        title: 'New Item',
        description: 'Item description',
      },
    });
  };

  return <Button title="Create Item" onPress={handleCreate} />;
}
```

## Available Queries and Mutations

### Queries

- `useGetItems()` - Fetch all items
- `useGetItem(id)` - Fetch a single item by ID

### Mutations

- `useCreateItem()` - Create a new item
- `useUpdateItem()` - Update an existing item
- `useDeleteItem()` - Delete an item

## Configuration

### Apollo Client URI

Update the GraphQL server URI in `apolloClient.js`:

```javascript
const httpLink = new HttpLink({
  uri: 'http://your-server-url:4000/graphql',
  credentials: 'include',
});
```

### GraphQL Schema

Modify the schema and resolvers in `server/schema.js` to add your custom types and operations.

## Environment Variables

For production, use environment variables to manage the GraphQL endpoint:

```javascript
// apolloClient.js
const uri =
  process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:4000/graphql';
```

## Troubleshooting

### Connection Issues

- Ensure the GraphQL server is running on port 4000
- Check that the URI in `apolloClient.js` is correct
- For Android emulator, use `10.0.2.2:4000` instead of `localhost:4000`

### iOS Emulator

- For iOS simulator, use `localhost:4000`

### CORS Issues

- The GraphQL server is configured to accept requests from the React Native client

## Next Steps

1. Add authentication/authorization to your GraphQL resolvers
2. Connect to a real database (MongoDB, PostgreSQL, etc.)
3. Add more complex queries and mutations based on your business logic
4. Implement error handling and caching strategies
5. Set up subscriptions for real-time updates
