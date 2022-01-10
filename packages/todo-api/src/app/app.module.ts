import { CacheModule, Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import { PostgresDatabaseProviderModule } from '../providers/database/postgres/provider.module';
import { join } from 'path';
import { FastifyContext } from 'apollo-server-fastify';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../models/users/user.module';
import { TodoModule } from '../models/todos/todo.module';

@Module({
  imports: [
    AuthModule,
    PostgresDatabaseProviderModule,
    UserModule,
    TodoModule,
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
})
export class AppModule {}
