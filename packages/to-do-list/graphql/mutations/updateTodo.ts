import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
  mutation updateTodo($updateTodoData: UpdateTodoArgs!) {
    updateTodo(updateTodoData: $updateTodoData) {
      id
      name
      description
      done
    }
  }
`;
