import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Int,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { User } from './user.model';
import { Category } from '../categories/category.model';
import { Todo } from '../todos/todo.model';
import { UserService } from './user.service';
import { CategoryService } from '../categories/category.service';
import { TodoService } from '../todos/todo.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gql-auth.guard';
import { User as UserContext } from '../../auth/dto/user-context-dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UserService,
    private categoriesService: CategoryService,
    private todosService: TodoService
  ) {}

  @Query(() => User, { name: 'userById' })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.user({ id });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'userByName' })
  async getUserByName(
    @UserContext() user: User,
    @Args('name', { type: () => String }) name: string
  ) {
    return this.usersService.user({ name: user.name });
  }

  @ResolveField('todos', () => [Todo])
  async getTodos(@Parent() user: User) {
    const { id } = user;
    return this.todosService.todos({ where: { userId: id } });
  }

  @ResolveField('categories', () => [Category])
  async getCategories(@Parent() user: User) {
    const { id } = user;
    return this.categoriesService.categories({ where: { userId: id } });
  }

  @Mutation(() => User)
  async changePasswordByID(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'password', type: () => String }) password: string
  ) {
    return this.usersService.changePassword({ where: { id }, data: password });
  }

  @Mutation(() => User)
  async changePasswordByName(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'password', type: () => String }) password: string
  ) {
    return this.usersService.changePassword({
      where: { name },
      data: password,
    });
  }
}
