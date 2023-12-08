import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import Avatar from 'src/components/Avatar/Avatar';
import { getServerUser } from 'src/utils/auth/get-server-user';

import { SignOutButton } from '../../auth/SignOutButton';

export default async function Header() {
  const user = await getServerUser();

  return (
    <header className="top-0 w-full h-[60px] px-[40px] border-solid border-0 border-b-[1px] border-stone-200 text-white flex items-center justify-between bg-white shadow-[0_0px_16px_0px_rgba(22,74,162,0.06)]">
      <Link className="flex justify-center items-center w-9 h-9" href="/">
        <Image alt="Devima logo" height={28} src="/devima-logo.svg" width={28} />
      </Link>
      {user ? (
        <div className="dropdown dropdown-bottom dropdown-end ">
          <div className="btn m-1 bg-white hover:bg-slate-100 w-14" role="button" tabIndex={0}>
            <Avatar imageUri={user.imageUri ?? ''} size={32} />
          </div>
          <ul className="dropdown-content z-[1] mt-1 menu p-2 shadow rounded-box w-52">
            <li>
              <Link className="text-black bg-white no-underline hover:bg-slate-100" href="/profile">
                <UserCircleIcon className="w-4 h-4" />
                Profile
              </Link>
            </li>
            <li>
              <SignOutButton />
            </li>
          </ul>
        </div>
      ) : (
        <Link
          className="flex justify-center items-center w-20 h-10 text-black bg-white no-underline hover:bg-slate-100 rounded-lg"
          href="/sign-in"
          type="button"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}
