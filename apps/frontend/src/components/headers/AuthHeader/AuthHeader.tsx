import Image from 'next/image';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <header className="top-0 w-full h-[60px] px-[40px] border-solid border-0 border-b-[1px] border-stone-200 text-white flex items-center justify-between bg-white shadow-[0_0px_16px_0px_rgba(22,74,162,0.06)]">
      <Link className="flex justify-center items-center w-9 h-9 rounded-full" href="/">
        <Image alt="Devima logo" height={28} src="/devima-logo.svg" width={28} />
      </Link>
    </header>
  );
}
