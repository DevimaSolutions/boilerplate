import { ConfirmEmail } from 'src/components/auth/ConfirmEmail';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function ConfirmEmailPage() {
  await requireUnauthorizedUser();

  return <ConfirmEmail />;
}
