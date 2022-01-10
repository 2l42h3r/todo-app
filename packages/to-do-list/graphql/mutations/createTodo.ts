import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
  mutation createTodo($createTodoData: CreateTodoArgs!) {
    createTodo(createTodoData: $createTodoData) {
      id
      name
      description
      done
    }
  }
`;
