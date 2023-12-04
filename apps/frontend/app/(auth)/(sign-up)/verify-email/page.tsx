import { VerifyEmail } from 'src/components/auth/VerifyEmail';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function VerifyEmailPage() {
  await requireUnauthorizedUser();

  return <VerifyEmail />;
}
