import { VerifyEmail } from 'src/components/auth/VerifySignUp';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function VerifyEmailPage() {
  await requireUnauthorizedUser();

  return <VerifyEmail />;
}
