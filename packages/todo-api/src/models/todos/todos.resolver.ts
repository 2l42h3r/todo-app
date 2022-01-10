import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { UpdateTodoArgs } from './dto/update-todo.args';
import { CreateTodoArgs } from './dto/create-todo.args';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { User as UserContext } from '../../auth/dto/user-context-dto';
import { User } from '../users/user.model';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Todo, { name: 'todo' })
  async getTodo(
    @Args('id', { type: () => Int }) id: number,
    @UserContext() user: User
  ) {
    const todo = await this.todoService.todo({ id });
    if (todo?.userId !== user.id) {
      return null;
    }
    return todo;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Todo], { name: 'todos' })
  async getTodos(@UserContext() user: User) {
    return this.todoService.todos({ where: { userId: user.id } });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async removeTodo(
    @Args('id', { type: () => Int }) id: number,
    @UserContext() user: User
  ) {
    const todo = await this.todoService.todo({ id });
    if (todo?.userId !== user.id) {
      return null;
    }
    return this.todoService.deleteTodo({ id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async createTodo(
    @Args('createTodoData') createTodoData: CreateTodoArgs,
    @UserContext() user: User
  ) {
    return this.todoService.createTodo({
      ...createTodoData,
      user: { connect: { id: user.id } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Todo)
  async updateTodo(
    @Args('updateTodoData') updateTodoData: UpdateTodoArgs,
    @UserContext() user: User
  ) {
    const todo = await this.todoService.todo({ id: updateTodoData.id });
    if (todo?.userId !== user.id) {
      return null;
    }
    return this.todoService.updateTodo({
      where: { id: updateTodoData.id },
      data: updateTodoData,
    });
  }
}
