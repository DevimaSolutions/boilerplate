import { SignIn } from 'src/components/auth/SignIn';
import { requireUnauthorizedUser } from 'src/utils/authorized-helper.util';

export default async function SignInPage() {
  await requireUnauthorizedUser();

  return <SignIn />;
}
