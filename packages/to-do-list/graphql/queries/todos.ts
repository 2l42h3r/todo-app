import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query getTodos {
    todos {
      ... on Todo {
        id
        name
        description
        done
      }
    }
  }
`;
