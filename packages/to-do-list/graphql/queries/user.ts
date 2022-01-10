import { gql } from '@apollo/client';

export const GET_FULL_USER = gql`
  query user {
    user {
      id
      name
      todos {
        ... on Todo {
          id
          name
          description
          done
        }
      }
    }
  }
`;
