import Todo from '../components/Todo';
import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../graphql/queries/todos';
import type { getTodos } from '../graphql/queries/__generated__/getTodos';

export const Index = () => {
  const { data } = useQuery<getTodos>(GET_TODOS);

  return (
    <section>
      {data?.todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </section>
  );
};

export default Index;
