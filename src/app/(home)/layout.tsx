'use client';

import { Header } from '@/components/header';
import { motion } from 'framer-motion';
import { animate } from './animation';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { SplashScreen } from './components/splash';
import Image from 'next/image';

const MotionImage = motion.create(Image);

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [splashWasShown, setSplashWasShown] = useState<boolean>(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('splash');
    setSplashWasShown(!!stored);
  }, []);

  const handleSplashAnimationEnd = useCallback(() => {
    sessionStorage.setItem('splash', '1');
    setSplashWasShown(true);
  }, []);

  if (!splashWasShown) {
    return (
      <BackgroundImage>
        <SplashScreen onEnd={handleSplashAnimationEnd} />
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
      <div className="relative size-full">{children}</div>
    </motion.div>
  );
};
