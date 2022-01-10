import Todo from '../components/Todo';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/todos';
import type { getTodos } from '../graphql/queries/__generated__/getTodos';
import { useState } from 'react';

export const Index = () => {
  const { data } = useQuery<getTodos>(GET_TODOS);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const addCallback = () => setIsAdding(false);

  return (
    <section>
      {data?.todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
      {!isAdding ? (
        <div
          onClick={() => setIsAdding(true)}
          className={
            'rounded-lg w-full h-full flex border-2 border-gray-600 border-dashed my-4 cursor-pointer p-4 text-2xl'
          }
        >
          <div className="mx-auto">+</div>
        </div>
      ) : (
        <Todo
          id={0}
          name=""
          description=""
          done={false}
          isCreating
          addCallback={addCallback}
        />
      )}
    </section>
  );
};

export default Index;
