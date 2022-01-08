import type { TAuthPayload } from './auth-payload.interface';

export interface JWTValidatedResponse {
  username: TAuthPayload['name'];
  sub: TAuthPayload['id'];
}
