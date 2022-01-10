/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTodoArgs } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateTodo
// ====================================================

export interface updateTodo_updateTodo {
  __typename: "Todo";
  id: number;
  name: string;
  description: string | null;
  done: boolean;
}

export interface updateTodo {
  updateTodo: updateTodo_updateTodo;
}

export interface updateTodoVariables {
  updateTodoData: UpdateTodoArgs;
}
