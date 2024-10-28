'use client';

import { Header } from '@/components/header';
import { motion } from 'framer-motion';
import { animate } from './animation';
import { ReactNode } from 'react';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="size-full h-svh overflow-hidden text-white bg-black relative">
      <motion.div
        variants={animate.root}
        initial="enter"
        animate="center"
        className="size-full"
      >
        <motion.div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]"></motion.div>
        <div className="relative flex flex-col h-full">
          <motion.div variants={animate.header}>
            <Header className="text-white" />
          </motion.div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
