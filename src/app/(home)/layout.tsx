import { Header } from '@/components/header';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="size-full h-svh overflow-hidden text-creme bg-black relative">
      <div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]" />
      <div className="relative flex flex-col h-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
