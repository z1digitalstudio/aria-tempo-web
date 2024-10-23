import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import SpotifyIcon from '@/assets/icons/spotify.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Carousel } from './(home)/components/Carousel';
import { Button } from '@/components/Button';

const CAROUSEL_ITEMS = [
  'Tempo is a music discovery tool for you to stay.',
  'Tempo combines expert curation from tastemakers.',
  'Tempo combines environmental factors, like the weather and time of day.',
  'Tempo combines environmental factors, like the weather and time of day.',
];

export default function Home() {
  return (
    <main className="size-full h-screen overflow-hidden text-white bg-black relative">
      <div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:190%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]" />
      <div className="z-10 relative flex flex-col h-full">
        <header className="flex justify-between items-center py-8 px-4 max-w-5xl border-b-white border-b border-opacity-20">
          <div className="flex items-baseline">
            <span className="flex after:content-['|'] after:leading-3 items-baseline after:px-2">
              <Logo />
            </span>
            <h1>Tempo</h1>
          </div>
          {/* Todo: Focus style */}
          <ButtonIcon Icon={MenuIcon} label="Open menu" />
        </header>
        <section className="bg-creme mt-auto text-black py-10 px-4 max-w-5xl border-b-white border-b border-opacity-20 text-xl/6 text-center">
          <Carousel items={CAROUSEL_ITEMS} className="mb-8" />
          <div className="flex gap-2 flex-col">
            <Button
              label="Connect with Spotify"
              isFullWidth
              Icon={SpotifyIcon}
            />
            <Button variant="secondary" label="Connect later" isFullWidth />
          </div>
        </section>
      </div>
    </main>
  );
}
