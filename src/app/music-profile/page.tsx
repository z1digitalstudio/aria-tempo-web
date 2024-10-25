'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { createArrayOfSize } from '@/utils/array';
import { links } from '@/utils/links';
import clsx from 'clsx';
import { motion, MotionValue, transform, useMotionValue } from 'framer-motion';
import { icon, numberOfItems } from './useIconTransform';

// Create Bidimensional Array of 7 * 7
const grid: number[][] = createArrayOfSize(
  numberOfItems,
  createArrayOfSize(numberOfItems).map((_, i) => i),
);
const gridSize = icon.size * numberOfItems;

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div
      style={{
        width: gridSize,
        height: gridSize,
        x,
        y,
        transform: 'translate(-50%, -50%)',
      }}
      drag
      dragSnapToOrigin
      className="top-1/2 left-1/2 absolute inset-0 size-full debug"
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
}: {
  row: number;
  col: number;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
}) {
  // We center the grid in the parent by applying some negative margins here
  const x = useMotionValue((gridSize / 2 + icon.size / 2) * -1);
  const y = useMotionValue((gridSize / 2) * -1);
  const scale = useMotionValue(1);

  const xOffset = col * icon.size + (row % 2) * (icon.size / 2);
  const yOffset = row * icon.size;
  const centerY = Math.floor(numberOfItems / 2);
  const centerX = Math.floor(numberOfItems / 2);

  const initScaleX = transform([0, gridSize / 2, gridSize], [0, 1, 0])(xOffset);
  const initScaleY = 1;

  const initScale = Math.min(initScaleX, initScaleY);
  scale.set(initScale);

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
        'rounded-full absolute bg-creme flex items-center justify-center text-black',
      )}
    >
      {/* {`${row}-${col}`} */}
      {/* {initScale.toFixed(2)} */}
    </motion.div>
  );
}
