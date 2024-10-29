import Image from 'next/image';
import { links } from '@/utils/links';
import Link from 'next/link';

export default function Private() {
  return (
    <div className="size-full h-svh overflow-hidden text-white bg-black relative">
      <Link href={links.home}>
        <Image
          fill
          src="/whotels/img/private-screen.png"
          alt=""
          className="object-contain object-top"
        />
      </Link>
    </div>
  );
}
