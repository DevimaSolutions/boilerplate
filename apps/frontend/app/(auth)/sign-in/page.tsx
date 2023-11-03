import { RedirectType, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { SignIn } from '../../../src/components/auth/SignIn';

export default async function SignInPage() {
  const session = await getServerSession();
  if (session) {
    redirect('/', RedirectType.replace);
  }

  return <SignIn />;
}
