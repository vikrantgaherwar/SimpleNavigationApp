import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

// Sample Query to fetch all items
export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      title
      description
      price
      createdAt
    }
  }
`;

// Sample Query to fetch a single item
export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      title
      description
      price
      createdAt
    }
  }
`;

// Sample Mutation to create an item
export const CREATE_ITEM = gql`
  mutation CreateItem($title: String!, $description: String!) {
    createItem(title: $title, description: $description) {
      id
      title
      description
      price
      createdAt
    }
  }
`;

// Sample Mutation to update an item
export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $title: String, $description: String) {
    updateItem(id: $id, title: $title, description: $description) {
      id
      title
      description
      price
      createdAt
    }
  }
`;

// Sample Mutation to delete an item
export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`;

// Custom hook for fetching all items
export const useGetItems = () => {
  return useQuery(GET_ITEMS);
};

// Custom hook for fetching a single item
export const useGetItem = id => {
  return useQuery(GET_ITEM, {
    variables: { id },
    skip: !id,
  });
};

// Custom hook for creating an item
export const useCreateItem = () => {
  return useMutation(CREATE_ITEM);
};

// Custom hook for updating an item
export const useUpdateItem = () => {
  return useMutation(UPDATE_ITEM);
};

// Custom hook for deleting an item
export const useDeleteItem = () => {
  return useMutation(DELETE_ITEM);
};
