import { Auth, SignIn } from '../../../src/components/auth';

export default function SignInPage() {
  return (
    <Auth accessLevel="unauthorized-only">
      <main>
        <h1>Sign In</h1>
        <SignIn />
      </main>
    </Auth>
  );
}
