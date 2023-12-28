import { RedirectType, redirect } from 'next/navigation';

import { VerifyEmail } from 'src/components/auth/VerifyEmail';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

import type { VerifyEmailProps } from 'src/components/auth/VerifyEmail';
import type { PageProps } from 'src/types/page';

export default async function VerifyEmailPage({
  searchParams,
}: PageProps<Partial<VerifyEmailProps>>) {
  await requireUnauthorizedUser();

  const email = searchParams.email;
  if (!email?.length) {
    redirect('/sign-up', RedirectType.replace);
  }

  return <VerifyEmail email={email} />;
}
