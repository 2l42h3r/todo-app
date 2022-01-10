import type { user_user_todos } from '../graphql/queries/__generated__/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';
import {
  faTrash,
  faCheckCircle,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { UPDATE_TODO } from '../graphql/mutations/updateTodo';
import {
  updateTodo,
  updateTodoVariables,
} from '../graphql/mutations/__generated__/updateTodo';
import { getTodos } from '../graphql/queries/__generated__/getTodos';
import { GET_TODOS } from '../graphql/queries/todos';
import {
  createTodo,
  createTodoVariables,
} from '../graphql/mutations/__generated__/createTodo';
import { CREATE_TODO } from '../graphql/mutations/createTodo';
import { omit } from 'lodash';
import CustomTextInput from './CustomTextInput';
import {
  removeTodo,
  removeTodoVariables,
} from '../graphql/mutations/__generated__/removeTodo';
import { REMOVE_TODO } from '../graphql/mutations/removeTodo';

export interface ITodo extends Omit<user_user_todos, '__typename'> {
  addCallback?: () => void;
  isCreating?: boolean;
}

const Todo = ({
  id,
  name,
  description,
  done,
  isCreating,
  addCallback,
}: ITodo): JSX.Element => {
  const [isEditing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    id,
    name,
    description,
    done,
  });
  const [editingTodo, setEditingTodo] = useState<ITodo>({
    id,
    name,
    description,
    done,
  });

  const shouldAllowEditing = isCreating || isEditing;

  const [updateTodo] = useMutation<updateTodo, updateTodoVariables>(
    UPDATE_TODO,
    {
      update(cache, { data }) {
        const existingTodos = cache.readQuery<getTodos>({ query: GET_TODOS });
        const newTodos = existingTodos.todos.map((todo) => {
          if (todo.id === data.updateTodo.id) {
            return { ...todo, ...data.updateTodo };
          }
          return todo;
        });
        cache.writeQuery<getTodos>({
          query: GET_TODOS,
          data: { todos: newTodos },
        });
      },
    }
  );

  const [createTodo] = useMutation<createTodo, createTodoVariables>(
    CREATE_TODO,
    {
      update(cache, { data }) {
        const existingTodos = cache.readQuery<getTodos>({ query: GET_TODOS });
        cache.writeQuery<getTodos>({
          query: GET_TODOS,
          data: { todos: [...existingTodos.todos, data.createTodo] },
        });
      },
    }
  );

  const [removeTodo] = useMutation<removeTodo, removeTodoVariables>(
    REMOVE_TODO,
    {
      update(cache, { data }) {
        const existingTodos = cache.readQuery<getTodos>({ query: GET_TODOS });
        cache.writeQuery<getTodos>({
          query: GET_TODOS,
          data: {
            todos: existingTodos.todos.filter(
              ({ id }) => id !== data.removeTodo.id
            ),
          },
        });
      },
    }
  );

  const handleCheck = async (): Promise<void> => {
    if (shouldAllowEditing) {
      if (editingTodo.name) {
        setCurrentTodo((prevState) => ({ ...prevState, ...editingTodo }));
        if (isCreating) {
          await createTodo({
            variables: {
              createTodoData: omit({ ...currentTodo, ...editingTodo }, 'id'),
            },
          });
          if (addCallback) {
            addCallback();
          }
        } else {
          await updateTodo({
            variables: { updateTodoData: { ...currentTodo, ...editingTodo } },
          });
        }
      } else {
        setEditingTodo(currentTodo);
      }
      return setEditing(false);
    }
    setCurrentTodo((prevState) => ({ ...prevState, done: !prevState.done }));
    await updateTodo({
      variables: {
        updateTodoData: { ...currentTodo, done: !currentTodo.done },
      },
    });
  };

  const handleChange = <T extends keyof Pick<ITodo, 'name' | 'description'>>(
    key: T,
    value: string,
    valid: boolean
  ): void => {
    if (valid) {
      setEditingTodo((prevState) => ({ ...prevState, [key]: value }));
    }
  };

  return (
    <div
      className={`rounded-lg w-full h-full flex border-2 border-black p-4 my-4 ${
        done && !isEditing ? 'line-through' : ''
      }`}
    >
      {shouldAllowEditing ? (
        <CustomTextInput
          value={editingTodo.name}
          id="name"
          name="ToDo Name"
          handleChange={handleChange}
          validationCallback={(value) => !!value}
        />
      ) : (
        <div>{name}</div>
      )}
      {shouldAllowEditing ? (
        <CustomTextInput
          value={editingTodo.description || ''}
          id="description"
          name="ToDo Description"
          handleChange={handleChange}
        />
      ) : description ? (
        <div className="ml-2 text-gray-600">{description}</div>
      ) : null}
      <div
        className={`ml-auto ${
          shouldAllowEditing ? 'text-gray-600' : 'text-black cursor-pointer'
        }`}
      >
        {!shouldAllowEditing && (
          <>
            <FontAwesomeIcon
              className="mx-4"
              onClick={() => setEditing(true)}
              icon={faPen}
            />
            <FontAwesomeIcon
              className="mx-4"
              icon={faTrash}
              onClick={() => removeTodo({ variables: { id } })}
            />
          </>
        )}
        <FontAwesomeIcon
          className="text-black mx-4 cursor-pointer"
          onClick={handleCheck}
          icon={faCheckCircle}
        />
      </div>
    </div>
  );
};

export default Todo;
