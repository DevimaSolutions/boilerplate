import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { envUtil } from '../../../../src/utils';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { AuthOptions } from 'next-auth';

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  jwt: {
    // TODO
  },
  providers: [
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
        const res = await fetch(`${envUtil.getEnv().backendUrl}/authorization/sign-in`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          // TODO: try to throw error message
          // so it can be displayed on a frontend
          return null;
        }
        return res.json();
      },
    }),
  ],
};

const handler = NextAuth(authOptions) as (req: NextApiRequest, res: NextApiResponse) => void;

export { handler as GET, handler as POST };
