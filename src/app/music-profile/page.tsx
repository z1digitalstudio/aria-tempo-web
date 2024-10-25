'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { createArrayOfSize } from '@/utils/array';
import { links } from '@/utils/links';
import clsx from 'clsx';
import { motion, MotionValue, transform, useMotionValue } from 'framer-motion';
import { icon, numberOfItems, useIconTransform } from './useIconTransform';

const grid: number[][] = createArrayOfSize(
  numberOfItems,
  [0, 1, 2, 3, 4, 5, 6],
);

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      style={{
        // width: gridWidth,
        // height: gridHeight,
        x,
        y,
      }}
      drag
      dragSnapToOrigin
      className="absolute inset-0 size-full debug"
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
    (row % 2) * ((icon.size + icon.margin) / 2) -
    icon.margin * 2;
  const yOffset = row * icon.size;

  const centerY = Math.floor(numberOfItems / 2);
  const centerX = Math.floor(numberOfItems / 2);

  const screenOffsetY = yOffset + 20;
  const screenOffsetX = xOffset + 20;
  const initYScale = transform([0, 150, 300], [0, 1, 0])(screenOffsetY);
  const initXScale = transform([0, 187.5, 375], [0, 1, 0])(screenOffsetX);

  scale.set(Math.min(initXScale, initYScale));

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
        row === centerY && 'bg-white',
        col === centerY && row === centerX && 'bg-[red]',
        'absolute bg-creme rounded-full flex items-center justify-center text-black',
      )}
    >
      {Math.min(initXScale, initYScale).toFixed(2)}
    </motion.div>
  );
}
