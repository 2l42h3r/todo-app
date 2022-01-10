import NextAuth from 'next-auth';
import type { user } from '../graphql/queries/__generated__/user';

declare module 'next-auth' {
  interface Session {
    user: user;
    accessToken: string;
  }

  interface JWT {
    accessToken?: string;
  }
}
