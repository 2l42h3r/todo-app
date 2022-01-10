/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user_todos {
  __typename: "Todo";
  id: number;
  name: string;
  description: string | null;
  done: boolean;
}

export interface user_user {
  __typename: "User";
  id: number;
  name: string;
  todos: user_user_todos[];
}

export interface user {
  user: user_user;
}
