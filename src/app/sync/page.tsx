import { ButtonLink } from '@/components/cta/link';
import Image from 'next/image';
import SpotifyIcon from '@/assets/icons/spotify.svg';
import { links } from '@/navigation';
import { Button } from '@/components/cta/button';

export default function Sync() {
  return (
    <main className="relative">
      <div className="relative flex items-start size-full h-svh bg-[length:170%] bg-[center_top_-7.5rem]  lg:bg-contain bg-no-repeat bg-black lg:bg-center bg-[url('/whotels/illustration/sync/bg.png')]">
        <div className="aspect-square lg:h-full lg:mt-[-4rem] w-full flex items-center justify-center">
          <Image
            src="/whotels/illustration/sync/shape.png"
            alt=""
            width={190}
            height={190}
          />
        </div>
      </div>
      <section className="absolute w-full bottom-0 bg-creme mt-auto text-black pt-12 pb-4 px-4 border-b-white border-b border-opacity-20 text-xl/6 text-center">
        <div className="mb-10 flex flex-col gap-6">
          <h1 className="type-headline-4">Connect to your Spotify</h1>
          <p className="text-balance mb-3 type-body-2 opacity-50">
            Link your Spotify profile to get more personalized experience plus
            your music profile.
          </p>
        </div>

        <div className="flex gap-2 flex-col">
          <Button Icon={SpotifyIcon} label="Connect to Spotify" isFullWidth />
          <ButtonLink
            label="Connect later"
            variant="secondary"
            isFullWidth
            href={links.home}
          />
        </div>
      </section>
    </main>
  );
}
