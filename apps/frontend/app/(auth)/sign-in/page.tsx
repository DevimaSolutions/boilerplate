import { SignIn } from 'src/components/auth/SignIn';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function SignInPage() {
  await requireUnauthorizedUser();

  return <SignIn />;
}
