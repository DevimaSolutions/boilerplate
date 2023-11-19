import NextAuth from 'next-auth';

import { authOptions } from 'src/utils/auth';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = NextAuth(authOptions) as (req: NextApiRequest, res: NextApiResponse) => void;

export { handler as GET, handler as POST };
