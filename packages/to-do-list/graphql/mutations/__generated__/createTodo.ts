/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTodoArgs } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createTodo
// ====================================================

export interface createTodo_createTodo {
  __typename: "Todo";
  id: number;
  name: string;
  description: string | null;
  done: boolean;
}

export interface createTodo {
  createTodo: createTodo_createTodo;
}

export interface createTodoVariables {
  createTodoData: CreateTodoArgs;
}
