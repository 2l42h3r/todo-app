import NextAuth, { Session, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import axios from 'axios';
import createClient from '../../../graphql/createClient';
import { JWT } from 'next-auth/jwt';
import { omit } from 'lodash';
import { GET_FULL_USER } from '../../..//graphql/queries/user';
import type {
  user,
  user_user,
} from '../../../graphql/queries/__generated__/user';

export default NextAuth({
  debug: true,
  providers: [
    Credentials({
      name: 'ToDo List',
      credentials: {
        username: { label: 'Username', type: 'string' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log(' in authorize ');
        try {
          const signInRequest = await axios.post<{ access_token: string }>(
            'http://localhost:3333/api/auth/login',
            credentials
          );

          const { access_token } = signInRequest.data;
          console.log('data', signInRequest.data);

          if (access_token) {
            try {
              const {
                data: { user },
              } = await createClient(access_token).query<user>({
                query: GET_FULL_USER,
              });
              return { ...signInRequest.data, ...user };
            } catch (err) {
              console.log(err);
              throw err;
            }
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  secret: 'test',
  callbacks: {
    jwt(params: { token: JWT; user: User }) {
      console.log('params in jwt callback', params);
      if (params.user) {
        params.token.accessToken = params.user?.access_token;
        params.token.user = omit(params.user, 'access_token');
      }
      return params.token;
    },
    session(params: { session: Session; token: JWT }) {
      console.log('params in session callback', params);
      params.session.user = {
        ...params.session.user,
        ...(params.token.user as user_user),
      };
      params.session.accessToken = params.token.accessToken as string;
      return params.session;
    },
  },
});
