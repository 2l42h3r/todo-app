/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTodos
// ====================================================

export interface getTodos_todos {
  __typename: "Todo";
  id: number;
  name: string;
  description: string | null;
  done: boolean;
}

export interface getTodos {
  todos: getTodos_todos[];
}
