import { FastifyContext } from 'apollo-server-fastify';
import { TGuarded } from './guarded-payload.interface';

export interface GqlGuardedContext extends FastifyContext {
  req: TGuarded<FastifyContext['request']>;
}
