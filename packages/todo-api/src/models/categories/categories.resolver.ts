import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TodoService } from '../todos/todo.service';
import { Category } from './category.model';
import { Todo } from '../todos/todo.model';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    private todoService: TodoService
  ) {}

  @Query(() => Category, { name: 'category' })
  async getCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.category({ id });
  }

  @ResolveField('todos', () => [Todo], { nullable: 'items' })
  async getTodos(@Parent() category: Category) {
    const { id } = category;
    return this.todoService.todos({ where: { categoryId: id } });
  }
}
