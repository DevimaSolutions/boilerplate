import { Profile } from 'src/components/auth/Profile';
import { requireAuthorizedUser } from 'src/utils/auth.util';

export default async function ProfilePage() {
  await requireAuthorizedUser();

  return <Profile />;
}
