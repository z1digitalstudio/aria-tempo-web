'use client';

import { createArrayOfSize } from '@/utils/array';
import clsx from 'clsx';
import {
  motion,
  MotionValue,
  transform,
  useAnimationControls,
  useMotionValue,
} from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Card } from './card';
import Image from 'next/image';
import { Banner } from './banner';

const MotionImage = motion.create(Image);

export const numberOfItems = 5;

export const icon = {
  margin: 0,
  size: 160,
};

// Grid is as bigger as the circles if contains
const gridSize = icon.size * numberOfItems;

type Circle = {
  x: number;
  y: number;
  src: string;
  scale: number;
};

const createCircle = (col: number, row: number) => {
  return {
    x: 0,
    y: 0,
    src: `/whotels/img/explore/shape-${row}-${col}.png`,
    scale: 1,
  };
};

// Create Bidimensional Array of 7 * 7
const grid: Circle[][] = createArrayOfSize(numberOfItems).map((_, row) => {
  return createArrayOfSize(numberOfItems).map((_, col) => {
    return createCircle(col, row);
  });
});

export function Grid() {
  // These are the coord values of the drag plane
  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);
  const planeLeft = useMotionValue(0);
  const planeTop = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerOffsetX = (containerRect.width - gridSize) / 2;
      const centerOffsetY = (containerRect.height - gridSize) / 2;

      planeLeft.set(centerOffsetX);
      planeTop.set(centerOffsetY);
    }
  }, [planeLeft, planeTop]);

  const [showInfo, setShowInfo] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const gridControls = useAnimationControls();

  const handleItemClick = ({ isCenter }: { isCenter: boolean }) => {
    if (!isCenter) return;
    setShowInfo((prev) => (isCenter ? !prev : prev));

    // Handle animation of elements
    const yOffset = showInfo ? 100 : -100;
    gridControls.start({
      top: planeTop.get() + yOffset,
      scale: showInfo ? 1 : 0.8,
      transition: { duration: 0.5 },
    });
  };

  const hideCard = () => {
    if (showInfo) {
      setShowInfo(false);

      gridControls.start({
        top: planeTop.get() + 100,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  };

  const updateCenter = () => {
    console.log(planeY.get(), planeX.get());
  };

  return (
    <>
      {/* Radial bg overlay which makes the circles darker on the edges of the screen */}
      <motion.div
        animate={{
          opacity: showInfo ? 0 : 0.7,
          transition: { type: 'tween', duration: 1.2 },
        }}
        className="explore-bg-overlay explore-bg-overlay-gradient absolute inset-0 z-10 pointer-events-none"
      />

      {/* "Drag or tap to explore" banner */}
      <Banner show={showBanner} />

      {/** The purpose of this div parent wrapping the circle grid container is having a clicable area the size of the grid container
       * so when the user interacts with any point of it we can handle the closing of the card */}
      <motion.div
        className="relative size-full flex items-center justify-center min-h-0"
        drag={showInfo}
        onDrag={hideCard}
        onClickCapture={hideCard}
        ref={containerRef}
      >
        <motion.div
          style={{
            width: gridSize,
            height: gridSize,
            x: planeX,
            y: planeY,
            left: planeLeft,
            top: planeTop,
          }}
          drag={!showInfo}
          className="absolute top-0 left-0"
          animate={gridControls}
          onDragStart={() => {
            setShowBanner(false);
          }}
          onDragEnd={updateCenter}
        >
          {grid.map((rows, rowIndex) =>
            rows.map((circle, colIndex) => (
              <Item
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                planeX={planeX}
                planeY={planeY}
                onClick={handleItemClick}
                showInfo={showInfo}
                {...circle}
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
  ...circleProps
}: Readonly<
  {
    row: number;
    col: number;
    planeX: MotionValue<number>;
    planeY: MotionValue<number>;
    showInfo: boolean;
    onClick: ({ isCenter }: { isCenter: boolean }) => void;
  } & Circle
>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(circleProps.scale);
  const [isCenter, setIsCenter] = useState(false);
  const [debugScale, setDebugScale] = useState(0);

  /**
   * This is the distance of this circle from the point 0,0 of the drag plane
   * To achieve the grid shape we want, we need to create a displacement in the x axis for the odd rows,
   * We will need to account for that later, when we calculate the circle scales
   **/
  const xOffset = col * icon.size + (row % 2) * (icon.size / 2);
  const yOffset = row * icon.size;

  // Keep track of our calculated x and y scales - we'll
  // set scale to the smallest of the two
  const xScale = useRef(1);
  const yScale = useRef(1);

  useLayoutEffect(
    function setScale() {
      const transformScaleOnX = (v: number) => {
        // This is the distance from the current x point in drag plane + the position x of circle
        // We also add the circle radius cause we want to take the center of circle as reference, not the corner.
        const currentOffset = v + xOffset + icon.size / 2;

        xScale.current = transform(
          [-100, gridSize / 2, gridSize + 100],
          [0, 1, 0],
        )(currentOffset);

        const result = Math.min(xScale.current, yScale.current);
        scale.set(result);
        setDebugScale(result);
        setIsCenter(result > 0.9 && result < 1.1);
      };

      const transformScaleOnY = (v: number) => {
        // This is the distance from the current y point in drag plane + the position y of circle
        // We also add the circle radius cause we want to take the center of circle as reference, not the corner.
        const currentOffset = v + yOffset + icon.size / 2;

        yScale.current = transform(
          [-100, gridSize / 2, gridSize + 100],
          [0, 1, 0],
        )(currentOffset);

        const result = Math.min(xScale.current, yScale.current);
        scale.set(result);
        setDebugScale(result);
        setIsCenter(result > 0.9 && result < 1.1);
      };

      // Set scale when the drag plan is moving
      planeY.on('change', transformScaleOnY);
      planeX.on('change', transformScaleOnX);

      // Set inital scale
      transformScaleOnX(0);
      transformScaleOnY(0);
    },
    [scale, xOffset, yOffset],
  );

  return (
    <motion.button
      key={showInfo.toString()}
      style={{
        x,
        y,
        width: icon.size,
        height: icon.size,
        left: xOffset,
        top: yOffset,
        scale,
      }}
      className={clsx(
        !isCenter ? 'explore-gradient-ring' : 'bg-opacity-0',
        'rounded-full absolute text-creme outline-none',
      )}
      onClick={() => {
        onClick({ isCenter });
      }}
    >
      <MotionImage
        src={circleProps.src}
        alt=""
        fill
        className="object-contain"
        initial={{ opacity: 0 }}
        animate={{ opacity: isCenter ? 1 : 0 }}
        transition={{ stiffness: 0.5 }}
      />
      {/* {circleProps.src.split('/whotels/img/explore/')[1]} */}
      {/* Debugging values */}
      {/* {`${row}-${col}`}
      <br />
      {debugScale.toFixed(2)} */}
      {debugScale.toFixed(2)}
    </motion.button>
  );
}
