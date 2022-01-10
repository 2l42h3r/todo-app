import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Boolean)
  done!: boolean;

  @Field(() => Int)
  userId!: number;
}
