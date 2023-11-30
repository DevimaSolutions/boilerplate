import { ResetPassword } from 'src/components/auth/ResetPassword';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function ResetPasswordPage() {
  await requireUnauthorizedUser();

  return <ResetPassword />;
}
