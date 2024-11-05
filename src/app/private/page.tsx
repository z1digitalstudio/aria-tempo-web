'use client';

import SpotifyIcon from '@/assets/icons/spotify.svg';
import BackIcon from '@/assets/icons/back.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import { Button } from '@/components/cta/button';
import { motion } from 'framer-motion';
import { animate } from './animation';
import { Header } from '@/components/header';
import Image from 'next/image';
import { links } from '@/utils/links';
import Link from 'next/link';
import { useState } from 'react';
import { CustomizeFormView } from './views/customizeForm';
import { ButtonIcon } from '@/components/buttonIcon';

const SONGS = [
  {
    title: 'Arbor',
    author: 'Samuel Knees',
    imgSrc: '/whotels/img/songs/image-1.png',
  },
  {
    title: 'Time Spent',
    author: 'Deaf Center',
    imgSrc: '/whotels/img/songs/image-2.png',
  },
  {
    title: 'Veiled Remembrance',
    author: 'Janet Redger',
    imgSrc: '/whotels/img/songs/image-3.png',
  },
  {
    title: 'Glance Out of Casement',
    author: 'nascondiglio',
    imgSrc: '/whotels/img/songs/image-4.png',
  },
  {
    title: 'Prato di girasoli',
    author: 'Gianni Domeneci',
    imgSrc: '/whotels/img/songs/image-5.png',
  },
  {
    title: 'Heaver',
    author: 'Dirk Maasseen',
    imgSrc: '/whotels/img/songs/image-6.png',
  },
  {
    title: 'Arbor',
    author: 'Samuel Knees',
    imgSrc: '/whotels/img/songs/image-1.png',
  },
  {
    title: 'Time Spent',
    author: 'Deaf Center',
    imgSrc: '/whotels/img/songs/image-2.png',
  },
];

export default function Private() {
  const [step, setStep] = useState<'customize' | 'playlist'>('customize');

  const handleCreatePlaylist = () => setStep('playlist');

  if (step === 'customize') {
    return <CustomizeFormView onSubmit={handleCreatePlaylist} />;
  }

  return (
    <div className="size-full h-svh overflow-hidden text-white bg-black relative">
      <motion.div
        variants={animate.root}
        initial="enter"
        animate="center"
        className="size-full relative flex flex-col"
      >
        <motion.div variants={animate.header}>
          <Header className="text-white" />
        </motion.div>
        <motion.main
          variants={animate.content}
          className="flex-1 flex flex-col h-full overflow-auto"
        >
          <motion.nav
            variants={animate.info}
            className="px-4 py-6 flex justify-between items-center"
          >
            <Link href={links.home}>
              <span className="sr-only">Go back</span>
              <BackIcon />
            </Link>
          </motion.nav>
          <motion.nav
            variants={animate.info}
            className="px-4 py-6 flex justify-between items-baseline border-white border-b border-opacity-20"
          >
            <h1 className="type-headline-2">Relax</h1>
            <ButtonIcon
              label="Go back to customize"
              Icon={FilterIcon}
              onClick={() => setStep('customize')}
            />
          </motion.nav>

          <motion.section
            variants={animate.list}
            className="flex flex-1 overflow-auto w-full flex-col justify-center items-center mb-auto"
          >
            <ul className="w-full flex flex-col">
              {SONGS.map((s, index) => {
                return (
                  <li
                    key={`${s.title}-${s.author}-${index}`}
                    className="flex border-t-white border-t border-opacity-20 p-4 gap-6 items-center"
                  >
                    <Image
                      width={53}
                      height={53}
                      src={s.imgSrc}
                      alt=""
                      className="rounded-md box-border border-white border border-opacity-20"
                    />
                    <div>
                      <h2>{s.title}</h2>
                      <span className="opacity-50">{s.author}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </motion.section>
          <motion.footer
            className="relative pt-6 pb-8 px-4 border-t-white border-t after:mt-[-1px] border-opacity-20 after:absolute after:-top-20 after:inset-x-0 after:from-black after:to-black/0 after:h-20 after:bg-gradient-to-t"
            variants={animate.footer}
          >
            <Button
              label="Listen on Spotify"
              isFullWidth
              variant="secondary"
              outline
              theme="dark"
              Icon={SpotifyIcon}
            />
          </motion.footer>
        </motion.main>
      </motion.div>
    </div>
  );
}
