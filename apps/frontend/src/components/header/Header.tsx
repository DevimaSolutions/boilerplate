import Image from 'next/image';
import Link from 'next/link';

import { getServerUser } from 'src/utils/auth/get-server-user';

import { SignOutButton } from '../auth/SignOutButton';

export default async function Header() {
  const user = await getServerUser();
  return (
    <header className="static top-0 w-full h-[60px] px-[40px] flex items-center justify-between bg-primary shadow-[0_0px_16px_0px_rgba(22,74,162,0.06)]">
      {user ? (
        <>
          <Link className="text-white flex items-center gap-[10px]" href="/profile">
            <div className="avatar">
              <div className="w-6 rounded-full">
                <Image alt="Profile picture" height={24} src="avatar.svg" width={24} />
              </div>
            </div>
            {user.email}
          </Link>
          <SignOutButton />
        </>
      ) : (
        <div className="w-full flex justify-end">
          <Link
            className="btn btn-primary justify-self-end text-white border-none"
            href="/sign-in"
            type="button"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
