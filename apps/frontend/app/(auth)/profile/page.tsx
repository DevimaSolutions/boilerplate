import { Profile } from 'src/components/auth/Profile';
import { requireAuthorizedUser } from 'src/utils/authorized-helper.util';

export default async function ProfilePage() {
  // TODO: use NextAuth App Router guide for caching
  await requireAuthorizedUser();

  return <Profile />;
}
