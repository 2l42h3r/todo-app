import { Module } from '@nestjs/common';
import { PostgresDatabaseProviderModule } from '../../providers/database/postgres/provider.module';
import { TodoModule } from '../todos/todo.module';
import { UserService } from './user.service';
import { UsersResolver } from './users.resolver';

@Module({
  providers: [UserService, UsersResolver],
  exports: [UserService],
  imports: [PostgresDatabaseProviderModule, TodoModule],
})
export class UserModule {}
