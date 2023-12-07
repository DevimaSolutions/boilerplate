import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { envUtil } from '..';

import type { AuthOptions, DefaultUser } from 'next-auth';

const env = envUtil.getEnv();

export const authOptions: AuthOptions = {
  providers: [
    Google(env.google),
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch(`${env.backendUrl}/authorization/sign-in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
        });
        if (!res.ok) {
          return null;
        }
        return res.json();
      },
    }),
  ],
  debug: true,
  callbacks: {
    async session({ session, token }) {
      if (!token.sub) {
        return session;
      }

      // Get session data
      const res = await fetch(`${env.backendUrl}/authorization/session/${token.sub}`, {
        headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
      });
      if (!res.ok) {
        return session;
      }

      try {
        const user = (await res.json()) as DefaultUser;
        return { ...session, user };
      } catch (e) {
        // return original session on parsing error
        console.error(e);
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile && 'picture' in profile) {
        // TODO: check if this will work without picture (will it be null?)
        // ensure user is created on a backend from google account info
        const res = await fetch(`${env.backendUrl}/authorization/google`, {
          method: 'POST',
          body: JSON.stringify({
            googleAccountId: account.providerAccountId,
            email: profile.email,
            imageUri: profile.picture,
          }),
          headers: { 'Content-Type': 'application/json', 'x-api-key': env.apiKey },
        });
        // it will throw an error if user is blocked
        return res.ok;
      }
      return true;
    },
  },
  pages: {
    error: '/sign-in',
    signIn: '/sign-in',
  },
};
