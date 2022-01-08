import {
  IsString,
  IsOptional,
  IsInt,
  IsDefined,
  IsBoolean,
} from 'class-validator';
import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoArgs {
  @Field(() => Int)
  @IsInt()
  @IsDefined()
  id!: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  priority?: number;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  categoryId?: number;
}
