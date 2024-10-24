'use client';

import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { OnboardingCarousel } from './(home)/components/OnboardingCarousel';

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
          <div className="flex items-center">
            <Logo />
            <h1 className="mt-[0.1rem] font-helios uppercase text-sm/6 before:border-l before:pr-2 before:ml-2">
              Tempo
            </h1>
          </div>
          <ButtonIcon Icon={MenuIcon} label="Open menu" />
        </header>
        <OnboardingCarousel items={CAROUSEL_ITEMS} autoplay={5000} />
      </div>
    </main>
  );
}
