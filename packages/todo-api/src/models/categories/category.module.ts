import { Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from '../../providers/database/postgres/provider.module';
import { TodoModule } from '../todos/todo.module';
import { CategoryResolver } from './categories.resolver';
import { CategoryService } from './category.service';

@Module({
  imports: [PostgresDatabaseProviderModule, TodoModule],
  providers: [CategoryService, CategoryResolver],
  exports: [CategoryService],
})
export class CategoryModule {}
