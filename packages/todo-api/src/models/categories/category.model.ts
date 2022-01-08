import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todos/todo.model';

@ObjectType()
export class Category {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => Int)
  userId!: number;

  @Field(() => [Todo], { nullable: 'items' })
  todos!: Todo[];
}
