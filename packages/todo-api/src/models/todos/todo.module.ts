import { Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from '../../providers/database/postgres/provider.module';
import { TodoService } from './todo.service';
import { TodosResolver } from './todos.resolver';

@Module({
  imports: [PostgresDatabaseProviderModule],
  exports: [TodoService],
  providers: [TodoService, TodosResolver],
})
export class TodoModule {}
