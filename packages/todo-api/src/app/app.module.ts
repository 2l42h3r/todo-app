import { CacheModule, Module, Logger } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { PostgresDatabaseProviderModule } from '../providers/database/postgres/provider.module';
import { join } from 'path';
import { FastifyContext } from 'apollo-server-fastify';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../models/users/user.module';
import { TodoModule } from '../models/todos/todo.module';
import { CategoryModule } from '../models/categories/category.module';

@Module({
  imports: [
    AuthModule,
    PostgresDatabaseProviderModule,
    UserModule,
    TodoModule,
    CategoryModule,
    CacheModule.register(),
    GraphQLModule.forRoot({
      cors: true,
      autoSchemaFile: join(process.cwd(), 'packages/todo-api/schema.gql'),
      sortSchema: true,
      disableHealthCheck: true,
      context: ({ request }: FastifyContext) => ({
        headers: request.raw.headers,
      }),
    }),
  ],
  exports: [PostgresDatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
