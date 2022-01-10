import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Todo } from '../todos/todo.model';

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => [Todo], { nullable: 'items' })
  todos!: Todo[];
}
