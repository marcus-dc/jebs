import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInSchema } from './schemas/sign-in-schema';
import 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {
          type: 'text',
        },
        password: {
          type: 'text',
        },
      },
      authorize: async (creds) => {
        const { username, password } = signInSchema.parse(creds);
        try {
          // Fetch user
          const user = await Promise.resolve({
            id: 'some randomly generated id',
            username,
            password,
          });

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id: token.sub,
        },
      };
    },
    jwt: ({ token, user }) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- wrong types in next-auth
      if (!user) return token;
      return {
        ...token,
        ...user,
      };
    },
  },
  pages: {
    signIn: '/sign-in',
  },
});

declare module 'next-auth' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface User {
    username: string;
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface JWT {
    username: string;
  }
}
