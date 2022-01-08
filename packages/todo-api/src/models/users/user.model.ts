import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todos/todo.model';
import { Category } from '../categories/category.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  passwordHash!: string;

  @Field(() => [Category], { nullable: 'items' })
  categories!: Category[];

  @Field(() => [Todo], { nullable: 'items' })
  todos!: Todo[];
}
