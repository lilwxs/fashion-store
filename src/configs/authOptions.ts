import type { AuthOptions } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbUsers from '@/database/dbUsers';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    //https://cloud.google.com/ --> console --> APIs & services --> My Project --> Credentials --> Create OAuth client ID
    //http://localhost:3003/api/auth/callback/google
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    //https://github.com/settings/developers
    //http://localhost:3003/api/auth/callback/github
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email:', type: 'email', placeholder: 'email@google.com' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },

      //@ts-ignore
      async authorize(credentials: any) {
        if (!credentials) throw new Error('Credentials are required');

        try {
          console.log({ credentials });
          // return { name: 'Juan', password: 'juan@google.com', role: 'admin' }
          return await dbUsers.checkUserEmailPassword(
            credentials?.email as string,
            credentials?.password as string,
          );
        } catch (ignored) {
          return null;
        }
      },
    }),
  ],
  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },
  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },

  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // every day
  },
};
