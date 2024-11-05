'use client';

import { Button } from '@/components/cta/button';
import { motion } from 'framer-motion';
import { animate } from '../animation';
import Image from 'next/image';
import { InputRange } from '@/components/inputRange';
import { useState } from 'react';

export const CustomizeFormView = () => {
  const [mood, setMood] = useState(50);
  const [energy, setEnergy] = useState(50);

  return (
    <div className="size-full w-svw h-svh min-h-0 overflow-hidden text-white bg-black relative">
      <motion.div
        variants={animate.root}
        initial="enter"
        animate="center"
        className="size-full flex flex-col"
      >
        <header className="type-label-1 flex justify-center items-center text-white h-20 py-6 px-4">
          Customize your playlist
        </header>
        <main className="flex-1 flex flex-col justify-end">
          <div className="border-b-white border-b border-opacity-20 pb-4 flex-1 flex items-center justify-center">
            <Image
              src="/whotels/img/personal-shape.svg"
              alt=""
              width={190}
              height={190}
              className="mx-auto"
            />
          </div>

          <InputRange
            label="Energy"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            steps={[
              { value: 0, label: 'Low' },
              { value: 100, label: 'High' },
            ]}
            min={0}
            max={100}
            id="energy-range"
            className="py-8 px-6"
          />
          <InputRange
            label="Mood"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            steps={[
              { value: 0, label: 'Unfamiliar' },
              { value: 100, label: 'Familiar' },
            ]}
            min={0}
            max={100}
            id="mood-range"
            className="py-8 px-6 border-t border-white border-opacity-20"
          />
          <footer className="px-4 pb-6">
            <Button label="View Playlist" variant="secondary" isFullWidth />
          </footer>
        </main>
      </motion.div>
    </div>
  );
};
