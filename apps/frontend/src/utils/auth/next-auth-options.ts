import AzureADProvider from 'next-auth/providers/azure-ad';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { envUtil } from '..';

import type { AuthOptions, DefaultUser } from 'next-auth';

const env = envUtil.getEnv();

export const authOptions: AuthOptions = {
  providers: [
    Google(env.google),
    AzureADProvider(env.azureAD),
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
    Credentials({
      id: 'confirm-email',
      name: 'Confirm email address',
      credentials: {
        token: {},
      },
      // Sign in user when email is confirmed using OTP token
      async authorize(credentials) {
        const res = await fetch(`${env.backendUrl}/authorization/confirm-email`, {
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
      if (profile && account && ['google', 'azure-ad'].includes(account.provider)) {
        const res = await fetch(`${env.backendUrl}/authorization/${account.provider}`, {
          method: 'POST',
          body: JSON.stringify({
            accountId: account.providerAccountId,
            email: profile.email,
            imageUri: 'picture' in profile ? profile.picture : undefined,
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
  cookies: {
    sessionToken: {
      name: 'session-token',
      options: {
        path: '/',
      },
    },
    callbackUrl: {
      name: 'callback-url',
      options: {
        path: '/',
      },
    },
    csrfToken: {
      name: 'csrf-token',
      options: {
        path: '/',
      },
    },
  },
};
