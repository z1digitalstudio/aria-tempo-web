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
import { icon, numberOfItems } from './constants';
import { useLayoutEffect, useRef, useState } from 'react';
import { ringCardVariants, bannerVariants } from './animation';
import { Banner } from './banner';
import { Card } from './card';

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

  const handleItemClick = ({ isCenter }: { isCenter: boolean }) => {
    // Show information card
    setShowInfo((prev) => (isCenter ? !prev : false));

    // Handle animation of elements
    const yOffset = showInfo ? 100 : isCenter ? -100 : 0;
    gridControls.start({
      y: y.get() + yOffset,
      transition: { y: { duration: 0.5, delay: 0.1 } },
    });
  };

  const handleClickOnDragSurface = () => {
    if (showInfo) {
      handleItemClick({ isCenter: false });
    }
  };

  return (
    <>
      {/* Radial bg overlay which makes the circles darker on the edges of the screen */}
      <motion.div
        animate={{
          opacity: showInfo ? 0 : 1,
          transition: { type: 'tween', duration: 1.2 },
        }}
        className="explore-bg-overlay explore-bg-overlay-gradient absolute inset-0 z-10 pointer-events-none"
      />

      {/* "Drag or tap to explore" banner */}
      <Banner show={showBanner} />

      {/** The purpose of this div parent wrapping the circle grid container is having a clicable area the size of the grid container
       * so when the user interacts with any point of it we can handle the closing of the card */}
      <motion.div
        className="relative size-full"
        drag={showInfo}
        dragSnapToOrigin
        onDrag={handleClickOnDragSurface}
        onClickCapture={handleClickOnDragSurface}
      >
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
          onDragStart={() => {
            setShowBanner(false);
          }}
        >
          {grid.map((rows, rowIndex) =>
            rows.map((colIndex) => (
              <Item
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                planeX={x}
                planeY={y}
                onClick={handleItemClick}
                showInfo={showInfo}
              />
            )),
          )}
        </motion.div>
      </motion.div>
      <Card show={showInfo} />
    </>
  );
}

function Item({
  row,
  col,
  planeX,
  planeY,
  onClick,
  showInfo,
}: Readonly<{
  row: number;
  col: number;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  showInfo: boolean;
  onClick: ({ isCenter }: { isCenter: boolean }) => void;
}>) {
  // We center the grid in its flex parent by applying some negative margins here
  const x = useMotionValue((gridSize / 2 + icon.size / 2) * -1);
  const y = useMotionValue((gridSize / 2) * -1);
  const opacity = useMotionValue(0);
  const controls = useAnimationControls();

  const scale = useMotionValue(1);
  const centerY = Math.floor(numberOfItems / 2);
  const centerX = Math.floor(numberOfItems / 2);
  const xOffset = col * icon.size + (row % 2) * (icon.size / 2);
  const yOffset = row * icon.size;

  // Keep track of our calculated x and y scales - we'll
  // set scale to the smallest of the two
  const xScale = useRef(1);
  const yScale = useRef(1);

  useLayoutEffect(() => {
    const transformScaleOnX = (v: number) => {
      const screenOffset = v + xOffset + 20;

      const edgeDistance = icon.size / 2;
      xScale.current = transform(
        [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance],
        [0, 1.05, 0],
      )(screenOffset);

      scale.set(Math.min(xScale.current, yScale.current));
    };
    const transformScaleOnY = (v: number) => {
      const screenOffset = v + yOffset + 20;

      const edgeDistance = icon.size / 2;
      yScale.current = transform(
        [edgeDistance * -1, gridSize / 2, gridSize + edgeDistance],
        [0, 1.05, 0],
      )(screenOffset);

      scale.set(Math.min(xScale.current, yScale.current));
    };

    planeY.on('change', transformScaleOnY);
    planeX.on('change', transformScaleOnX);

    transformScaleOnX(0);
    transformScaleOnY(0);

    // When it's ready, set opacity to 1
    if (opacity.get() === 0) {
      controls.start({
        opacity: 1,
        transition: { opacity: { duration: 0.2 } },
      });
    }
  }, [planeX, planeY, scale, xOffset, yOffset, controls, opacity]);

  const isCenter = col === centerY && row === centerX;

  return (
    <motion.button
      key={showInfo.toString()}
      style={{
        top: yOffset,
        left: xOffset,
        width: icon.size,
        height: icon.size,
        x,
        y,
        scale,
        opacity,
      }}
      animate={controls}
      className={clsx(
        isCenter &&
          "bg-[url('/whotels/img/explore/shape.png')] bg-transparent bg-center bg-contain z-20",
        !isCenter && 'flex explore-gradient-ring',
        'rounded-full absolute bg-transparent flex items-center justify-center text-creme outline-none',
      )}
      onClick={() => {
        onClick({ isCenter });
      }}
    >
      {/* Debugging values */}
      {/* {`${row}-${col}`}
      <br />
      {initScale.toFixed(2)} */}
    </motion.button>
  );
}
