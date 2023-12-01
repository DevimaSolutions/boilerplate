import { ForgotPassword } from 'src/components/auth/ForgotPassword';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function ForgotPasswordPage() {
  await requireUnauthorizedUser();

  return <ForgotPassword />;
}
