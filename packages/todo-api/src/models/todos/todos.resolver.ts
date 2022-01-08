import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { UpdateTodoArgs } from './dto/update-todo.args';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => Todo, { name: 'todo' })
  async getTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.todo({ id });
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.deleteTodo({ id });
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoData') updateTodoData: UpdateTodoArgs) {
    return this.todoService.updateTodo({
      where: { id: updateTodoData.id },
      data: updateTodoData,
    });
  }
}
