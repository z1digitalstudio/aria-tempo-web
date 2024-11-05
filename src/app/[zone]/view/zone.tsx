'use client';

import InfoIcon from '@/assets/icons/info.svg';
import BackIcon from '@/assets/icons/back.svg';
import AddIcon from '@/assets/icons/add.svg';
import { Button } from '@/components/cta/button';
import { motion } from 'framer-motion';
import { animate } from '../animation';
import { Header } from '@/components/header';
import { ButtonIcon } from '@/components/buttonIcon';
import Image from 'next/image';
import { links } from '@/utils/links';
import Link from 'next/link';
import { Zone } from '../page';

const SONGS = [
  {
    title: 'Veiled Remembrance',
    author: 'Janet Redger',
    imgSrc: '/whotels/img/lobby-song-1.png',
  },
  {
    title: 'Glance Out of Casement',
    author: 'nascondiglio',
    imgSrc: '/whotels/img/lobby-song-2.png',
  },
];

export function ZoneView({ zone }: Readonly<{ zone: Zone }>) {
  return (
    <div className="size-full h-svh overflow-hidden text-white bg-black relative">
      <motion.div
        variants={animate.root}
        initial="enter"
        animate="center"
        className="size-full"
      >
        <div className="relative flex flex-col h-full">
          <motion.div variants={animate.header}>
            <Header className="text-white" />
          </motion.div>
          <motion.main
            className="relative flex flex-col h-full"
            variants={animate.root}
            initial="enter"
            animate="center"
          >
            <motion.div
              variants={animate.content}
              className="flex-1 flex flex-col h-full"
            >
              <motion.div
                variants={animate.info}
                className="px-4 py-4 flex justify-between items-center"
              >
                <Link href={links.home}>
                  <span className="sr-only">Go back</span>
                  <BackIcon />
                </Link>
                <p className="type-label-1 flex gap-1 items-center">
                  {zone.label}
                </p>
                <ButtonIcon Icon={InfoIcon} label="Learn more" />
              </motion.div>

              <motion.section
                variants={animate.list}
                className="flex w-full flex-col justify-center items-center mb-auto flex-1"
              >
                <div className="px-4 w-full flex flex-1 items-center justify-center">
                  <Image
                    width={200}
                    height={200}
                    src="/whotels/img/lobby.png"
                    alt=""
                  />
                </div>
                <ul className="w-full flex flex-col">
                  {SONGS.map((s) => {
                    return (
                      <li
                        key={`${s.title}-${s.author}`}
                        className="flex border-t-white border-t border-opacity-20 p-4 gap-6 items-center"
                      >
                        <Image width={53} height={53} src={s.imgSrc} alt="" />
                        <div>
                          <h2>{s.title}</h2>
                          <span className="opacity-50">{s.author}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.section>
            </motion.div>
            <motion.footer
              className="pt-6 pb-8 px-4 border-t-white border-t border-opacity-20"
              variants={animate.footer}
            >
              <Button
                label="Add your song"
                isFullWidth
                variant="secondary"
                Icon={AddIcon}
              />
            </motion.footer>
          </motion.main>
        </div>
      </motion.div>
    </div>
  );
}
