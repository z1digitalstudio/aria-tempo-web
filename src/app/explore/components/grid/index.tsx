'use client';

import { createArrayOfSize } from '@/utils/array';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  transform,
  useAnimationControls,
  useMotionValue,
} from 'framer-motion';
import { icon, numberOfItems } from './useIconTransform';
import { useState } from 'react';
import { ringCardVariants } from './animation';

// Create Bidimensional Array of 7 * 7
const grid: number[][] = createArrayOfSize(
  numberOfItems,
  createArrayOfSize(numberOfItems).map((_, i) => i),
);
const gridSize = icon.size * numberOfItems;

export function Grid() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [showInfo, setShowInfo] = useState(false);

  const handleRingClick = ({ isCenter }: { isCenter: boolean }) => {
    setShowInfo((prev) => (isCenter ? !prev : false));

    const yOffset = showInfo ? 100 : isCenter ? -100 : 0;
    controls.start({
      y: y.get() + yOffset,
      transition: { y: { duration: 0.5, delay: 0.1 } },
    });
  };
  const controls = useAnimationControls();

  return (
    <>
      <motion.div
        style={{
          width: gridSize,
          height: gridSize,
          x,
          y,
          transform: 'translate(-50%, -50%)',
        }}
        drag={!showInfo}
        dragSnapToOrigin
        className="top-1/2 left-1/2 absolute inset-0 size-full explore-bg-overlay"
        animate={controls}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((colIndex) => (
            <Item
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              onClick={handleRingClick}
            />
          )),
        )}
      </motion.div>
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="text-creme absolute -bottom-4 inset-x-4 border border-[#a59078] p-4 z-20"
            style={{
              background: 'radial-gradient(#40382E 0%, #000000 100%)',
            }}
            variants={ringCardVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="border border-creme p-6 text-center">
              <p className="type-label-1">Your unique score</p>
              <p className="type-number">94.6</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Item({
  row,
  col,
  onClick,
}: {
  row: number;
  col: number;
  onClick: ({
    isCenter,
    pos,
  }: {
    isCenter: boolean;
    pos: [number, number];
  }) => void;
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

  const isCenter = col === centerY && row === centerX;

  return (
    <motion.button
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
        isCenter &&
          "bg-[url('/whotels/img/explore/shape.png')] bg-transparent bg-center bg-contain z-20",
        !isCenter && 'flex explore-gradient-ring',
        'rounded-full absolute bg-transparent flex items-center justify-center text-black',
      )}
      onClick={() => onClick({ isCenter, pos: [row, col] })}
    >
      {/* {`${row}-${col}`} */}
      {/* {initScale.toFixed(2)} */}
    </motion.button>
  );
}
