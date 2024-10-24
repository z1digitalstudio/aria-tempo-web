import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="size-full h-svh overflow-hidden text-white bg-black relative">
      <div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]" />
      <div className="relative flex flex-col h-full">
        <header className="flex justify-between items-center py-6 px-4 border-b-white border-b border-opacity-20">
          <div className="flex items-center">
            <Logo />
            <p className="mt-[0.1rem] font-helios uppercase text-sm/6 before:border-l before:pr-2 before:ml-2">
              Tempo
            </p>
          </div>
          <ButtonIcon Icon={MenuIcon} label="Open menu" />
        </header>
        {children}
      </div>
    </div>
  );
}
