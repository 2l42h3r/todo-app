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

const Todo = ({
  id,
  name,
  description,
  done,
}: user_user_todos): JSX.Element => {
  const [isEditing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<
    Omit<user_user_todos, '__typename'>
  >({
    id,
    name,
    description,
    done,
  });

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

  const handleCheck = async (): Promise<void> => {
    if (isEditing) {
      await updateTodo({ variables: { updateTodoData: currentTodo } });
      return setEditing(false);
    }
    setCurrentTodo((prevState) => ({ ...prevState, done: !prevState.done }));
    await updateTodo({ variables: { updateTodoData: currentTodo } });
  };

  return (
    <div
      className={`rounded-lg w-full h-full flex border-2 border-black p-4 ${
        done ? 'line-through' : ''
      }`}
    >
      <div>{name}</div>
      {description && <div className="ml-2 text-gray-600">{description}</div>}
      {!isEditing && (
        <>
          <FontAwesomeIcon onClick={() => setEditing(true)} icon={faPen} />
          <FontAwesomeIcon icon={faTrash} />
        </>
      )}
      <FontAwesomeIcon onClick={handleCheck} icon={faCheckCircle} />
    </div>
  );
};

export default Todo;
