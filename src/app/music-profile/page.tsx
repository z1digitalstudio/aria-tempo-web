'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { createArrayOfSize } from '@/utils/array';
import { links } from '@/utils/links';
import clsx from 'clsx';
import { motion, MotionValue, useMotionValue } from 'framer-motion';
import { icon, useIconTransform } from './useIconTransform';

const grid: number[][] = createArrayOfSize(5, [0, 1, 2, 3, 4]);

export default function MusicProfile() {
  return (
    <div className="relative bg-black text-creme size-full h-svh flex flex-col">
      <Header />
      <main className="size-full flex-1 flex flex-col min-h-0">
        <div className="relative flex-1 overflow-hidden">
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

function Grid() {
  const gridWidth = icon.size * 5 + icon.margin * 4;
  const gridHeight = icon.size * 5;
  const x = useMotionValue(-100);
  const y = useMotionValue(0);

  return (
    <motion.div
      style={{
        width: gridWidth,
        height: gridHeight,
        x,
        y,
      }}
      drag
      dragSnapToOrigin
    >
      {grid.map((rows, rowIndex) =>
        rows.map((colIndex) => (
          <Item
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            planeX={x}
            planeY={y}
          />
        )),
      )}
    </motion.div>
  );
}

function Item({
  row,
  col,
  planeX,
  planeY,
}: {
  row: number;
  col: number;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  useIconTransform({ x, y, scale, planeX, planeY, xOffset, yOffset });

  return (
    <motion.div
      style={{
        top: yOffset,
        left: xOffset,
        width: icon.size,
        height: icon.size,
        x,
        y,
        scale,
      }}
      className={clsx(
        row === 2 && 'bg-white',
        col === 2 && row === 2 && 'bg-[red]',
        'absolute bg-creme rounded-full flex items-center justify-center text-black',
      )}
    >
      {xOffset}
    </motion.div>
  );
}
