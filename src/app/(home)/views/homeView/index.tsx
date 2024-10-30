'use client';

import LobbyIcon from '@/assets/icons/lobby.svg';
import PoolIcon from '@/assets/icons/pool.svg';
import WeatherIcon from '@/assets/icons/weather.svg';
import { motion } from 'framer-motion';
import { animate } from '../../animation';
import { links } from '@/utils/links';
import { ButtonLink } from '@/components/cta/link';
import { useState } from 'react';

const ZONES = [
  { label: 'Lobby', icon: LobbyIcon, href: links.lobby },
  { label: 'Pool', icon: PoolIcon, href: links.lobby },
];

const formatCurrentTime = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(Date.now()));
};

export default function HomeView() {
  return (
    <motion.main
      className="relative flex flex-col h-full"
      variants={animate.root}
      initial="enter"
      animate="center"
    >
      <section className="flex-1 ">
        <motion.div
          variants={animate.content}
          className="pt-8 pb-8 px-4 flex flex-col h-full"
        >
          <motion.div
            variants={animate.info}
            className="flex justify-between items-baseline mb-auto"
          >
            <p className="type-label-1">
              {formatCurrentTime({ weekday: 'long', hour: 'numeric' })}
            </p>
            <p className="type-label-1 flex gap-1 items-center">
              68º <WeatherIcon />
            </p>
          </motion.div>
          <motion.h1
            variants={animate.title}
            className="type-headline-4 text-balance max-w-[11rem] mb-auto"
          >
            Welcome to West Hollywood
          </motion.h1>
        </motion.div>
      </section>
      <motion.footer
        className="pt-6 pb-8 px-4 border-t-white border-t border-opacity-20"
        variants={animate.footer}
      >
        <p className="type-label-1 mb-4">Select your listening experience</p>
        <div className="w-full flex gap-3 flex-wrap">
          {ZONES.map((zone) => {
            return (
              <ButtonLink
                key={zone.label}
                Icon={zone.icon}
                label={zone.label}
                className="flex flex-col flex-1 py-6"
                href={zone.href}
              />
            );
          })}
          <ButtonLink
            label="Listen on my phone"
            isFullWidth
            href={links.private}
          />
        </div>
      </motion.footer>
    </motion.main>
  );
}
