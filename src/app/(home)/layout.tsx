'use client';

import { Header } from '@/components/header';
import { AnimatePresence, motion } from 'framer-motion';
import { animate } from './animation';
import { ReactNode } from 'react';
import Image from 'next/image';
const MotionImage = motion.create(Image);

const SPLASH = true;

export default function HomeLayout({ children }: { children: ReactNode }) {
  if (SPLASH) {
    return (
      <BackgroundImage>
        <SplashScreen />
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage>
      <div className="relative flex flex-col h-full">
        <motion.div variants={animate.header}>
          <Header className="text-white" />
        </motion.div>
        {children}
      </div>
    </BackgroundImage>
  );
}

const SplashScreen = () => {
  return <h1>Splash</h1>;
};

const BackgroundImage = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={animate.root}
      initial="enter"
      animate="center"
      className="z-10 size-full h-svh overflow-hidden text-white bg-black relative"
    >
      <MotionImage
        src="/whotels/img/splash.png"
        fill
        className="z-0 absolute object-cover opacity-70 object-[10%_-12.5rem] !w-[200%] !h-[200%]"
        alt=""
        quality={100}
        priority
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
};
