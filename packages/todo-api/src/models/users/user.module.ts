import { Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from '../../providers/database/postgres/provider.module';
import { CategoryModule } from '../categories/category.module';
import { TodoModule } from '../todos/todo.module';
import { UserService } from './user.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UserService, UsersResolver],
  exports: [UserService],
  imports: [PostgresDatabaseProviderModule, CategoryModule, TodoModule],
})
export class UserModule {}
