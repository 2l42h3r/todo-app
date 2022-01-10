import { gql } from '@apollo/client';

export const REMOVE_TODO = gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id) {
      id
    }
  }
`;
