'use client';

import WeatherIcon from '@/assets/icons/weather.svg';
import { motion } from 'framer-motion';
import { animate } from '../../animation';
import { ButtonLink } from '@/components/cta/link';
import { links } from '@/utils/links';

const formatCurrentTime = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(Date.now()));
};

export default function GetStartedView() {
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
            Tempo is a music discovery tool for your stay.
          </motion.h1>
        </motion.div>
      </section>
      <motion.footer className="pt-6 pb-8 px-4" variants={animate.footer}>
        <ButtonLink href={links.sync} label="Get Started" isFullWidth />
      </motion.footer>
    </motion.main>
  );
}
