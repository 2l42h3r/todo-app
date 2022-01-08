import type { User } from '@prisma/client';

export type TAuthPayload = Omit<User, 'passwordHash'>;
