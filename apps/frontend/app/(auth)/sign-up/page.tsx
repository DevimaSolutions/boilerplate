import { SignUp } from 'src/components/auth/SignUp';
import { requireUnauthorizedUser } from 'src/utils/auth.util';

export default async function SignUpPage() {
  await requireUnauthorizedUser();

  return <SignUp />;
}
