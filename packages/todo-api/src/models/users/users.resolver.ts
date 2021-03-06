import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './user.model';
import { Todo } from '../todos/todo.model';
import { UserService } from './user.service';
import { TodoService } from '../todos/todo.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { User as UserContext } from '../../auth/dto/user-context-dto';
import { TAuthPayload } from '../../auth/interface/auth-payload.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UserService,
    private readonly todosService: TodoService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@UserContext() user: TAuthPayload) {
    return this.usersService.user({ id: user.id });
  }

  @ResolveField('todos', () => [Todo])
  async getTodos(@Parent() user: User) {
    const { id } = user;
    return this.todosService.todos({ where: { userId: id } });
  }
}
