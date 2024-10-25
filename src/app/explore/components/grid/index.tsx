'use client';

import { createArrayOfSize } from '@/utils/array';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  MotionValue,
  transform,
  useAnimationControls,
  useMotionValue,
} from 'framer-motion';
import { icon, numberOfItems } from './useIconTransform';
import { useRef, useState } from 'react';
import { ringCardVariants, bannerVariants } from './animation';

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
  const [showBanner, setShowBanner] = useState(true);
  const gridControls = useAnimationControls();

  const handleRingClick = ({ isCenter }: { isCenter: boolean }) => {
    setShowInfo((prev) => (isCenter ? !prev : false));

    const yOffset = showInfo ? 100 : isCenter ? -100 : 0;
    gridControls.start({
      y: y.get() + yOffset,
      transition: { y: { duration: 0.5, delay: 0.1 } },
    });
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="text-creme absolute top-0 inset-x-0 p-4 z-20 bg-black-light bg-opacity-40 text-center"
            variants={bannerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="type-label-1">Drag and tap to explore</p>
          </motion.div>
        )}
      </AnimatePresence>
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
        className="top-1/2 left-1/2 absolute inset-0 size-full"
        animate={gridControls}
        onDragStart={() => setShowBanner(false)}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((colIndex) => (
            <Item
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              planeX={x}
              planeY={y}
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
  planeX,
  planeY,
  onClick,
}: {
  row: number;
  col: number;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  onClick: ({ isCenter }: { isCenter: boolean }) => void;
}) {
  // We center the grid in its flex parent by applying some negative margins here
  const x = useMotionValue((gridSize / 2 + icon.size / 2) * -1);
  const y = useMotionValue((gridSize / 2) * -1);

  const scale = useMotionValue(1);
  const xOffset = col * icon.size + (row % 2) * (icon.size / 2);
  const yOffset = row * icon.size;
  const centerY = Math.floor(numberOfItems / 2);
  const centerX = Math.floor(numberOfItems / 2);

  const edgeDistance = icon.size / 2;
  const initScaleX = transform(
    [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance],
    [0, 1.05, 0],
  )(xOffset);

  const initScaleY = transform(
    [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance].map((v) => {
      // In the y axis i need to account for the displacement of rows i'm doing at xOffset ((row % 2) * (icon.size / 2))
      const displacement = icon.size / 2;
      return v - displacement;
    }),
    [0, 1.05, 0],
  )(yOffset);

  const initScale = Math.min(initScaleX, initScaleY);
  scale.set(initScale);

  const isCenter = col === centerY && row === centerX;

  // Keep track of our calculated x and y scales - we'll
  // set scale to the smallest of the two
  const xScale = useRef(initScale);
  const yScale = useRef(initScale);

  planeX.on('change', (v: number) => {
    const screenOffset = v + xOffset + 20;

    const edgeDistance = icon.size / 2;
    xScale.current = transform(
      [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance],
      [0, 1.05, 0],
    )(screenOffset);

    scale.set(Math.min(xScale.current, yScale.current));
  });

  planeY.on('change', (v: number) => {
    const screenOffset = v + yOffset + 20;

    const edgeDistance = icon.size / 2;
    yScale.current = transform(
      [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance],
      [0, 1.05, 0],
    )(screenOffset);

    scale.set(Math.min(xScale.current, yScale.current));
  });

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
        'rounded-full absolute bg-transparent flex items-center justify-center text-creme',
      )}
      onClick={() => onClick({ isCenter })}
    >
      {/* Debugging values */}
      {/* {`${row}-${col}`}
      <br />
      {initScale.toFixed(2)} */}
    </motion.button>
  );
}
