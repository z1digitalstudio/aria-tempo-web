'use client';

import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import SpotifyIcon from '@/assets/icons/spotify.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Button } from '@/components/Button';
import { MouseEvent, useState } from 'react';
import { createArrayOfSize } from './(home)/components/Carousel';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_ITEMS = [
  'Tempo is a music discovery tool for you to stay.',
  'Tempo combines expert curation from tastemakers.',
  'Tempo combines environmental factors, like the weather and time of day.',
  'Tempo combines environmental factors, like the weather and time of day.',
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

export default function Home() {
  const [[page, direction], setPage] = useState([0, 0]);
  const items = CAROUSEL_ITEMS;
  const go = (e: MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) {
      const newPage = Number(e.target.getAttribute('data-page') ?? 0);
      setPage(([prevPage]) => {
        const direction = prevPage < newPage ? 1 : -1;
        return [newPage, direction];
      });
    }
  };

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
        <section className="bg-creme mt-auto text-black py-10 px-4 max-w-5xl border-b-white border-b border-opacity-20 text-xl/6 text-center">
          <AnimatePresence initial={false} custom={direction}>
            <div className="mb-8">
              <motion.p
                key={page}
                custom={direction}
                className="text-balance mb-6"
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 1, delay: 0.1 },
                  x: {
                    duration: 2,
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  },
                }}
              >
                {items[page]}
              </motion.p>
              <nav className="flex gap-2 w-full items-center justify-center">
                {createArrayOfSize(items.length).map((_, i) => (
                  <button
                    key={i}
                    data-page={i}
                    className={clsx(
                      'size-[5px] rounded-full bg-black',
                      page !== i && 'opacity-20',
                    )}
                    onClick={go}
                  ></button>
                ))}
              </nav>
            </div>
          </AnimatePresence>

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
