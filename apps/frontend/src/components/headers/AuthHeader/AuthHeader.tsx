import Image from 'next/image';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className="top-0 w-full h-[60px] px-[40px]  flex items-center bg-white">
      <Link className="flex justify-center items-center w-9 h-9 rounded-full" href="/">
        <Image alt="Devima logo" height={28} src="/devima-logo.svg" width={28} />
      </Link>
    </header>
  );
}
