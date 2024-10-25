'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { createArrayOfSize } from '@/utils/array';
import { links } from '@/utils/links';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const grid: number[][] = createArrayOfSize(5, [0, 1, 2, 3, 4]);

export default function MusicProfile() {
  return (
    <div className="relative bg-black text-creme size-full h-svh flex flex-col">
      <Header />
      <main className="size-full flex-1 flex flex-col min-h-0">
        <div className="relative flex-1">
          <Grid />
        </div>
        <footer className="border-t border-white border-opacity-20 py-6 px-4">
          <ButtonLink
            href={links.home}
            label="Start listening"
            variant="secondary"
            theme="dark"
          />
        </footer>
      </main>
    </div>
  );
}

export const icon = {
  margin: 20,
  size: 100,
};

function Grid() {
  const gridWidth = (icon.size + icon.margin) * 5;
  const gridHeight = icon.size * 5;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: gridWidth,
        height: gridHeight,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((colIndex) => (
          <Item key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
        )),
      )}
    </motion.div>
  );
}

function Item({ row, col }: { row: number; col: number }) {
  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  return (
    <div
      style={{
        top: yOffset,
        left: xOffset,
        width: icon.size,
        height: icon.size,
      }}
      className={clsx(
        row === 2 && 'bg-white',
        col === 2 && row === 2 && 'bg-[red]',
        'absolute bg-creme rounded-full',
      )}
    />
  );
}
