import type { TAuthPayload } from './auth-payload.interface';

export type TGuarded<T extends object> = T & { user: TAuthPayload };
