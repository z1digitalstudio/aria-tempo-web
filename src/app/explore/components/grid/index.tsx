'use client';

import { createArrayOfSize } from '@/utils/array';
import clsx from 'clsx';
import {
  animate,
  motion,
  MotionValue,
  transform,
  useAnimationControls,
  useMotionValue,
} from 'framer-motion';
import { icon, numberOfItems } from './constants';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Card } from './card';

// Create Bidimensional Array of 7 * 7
const grid: number[][] = createArrayOfSize(
  numberOfItems,
  createArrayOfSize(numberOfItems).map((_, i) => i),
);

// Grid is as bigger as the circles if contains
const gridSize = icon.size * numberOfItems;

export function Grid() {
  // These are the coord values of the drag plane
  const planeX = useMotionValue(0);
  const planeY = useMotionValue(0);

  // These are the coord values of the circle
  const circleX = useMotionValue(0);
  const circleY = useMotionValue(0);

  const [showInfo, setShowInfo] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const gridControls = useAnimationControls();

  const handleItemClick = ({ isCenter }: { isCenter: boolean }) => {
    // Show information card
    setShowInfo((prev) => (isCenter ? !prev : false));

    // Handle animation of elements
    const yOffset = showInfo ? 100 : isCenter ? -100 : 0;
    gridControls.start({
      y: planeY.get() + yOffset,
      transition: { y: { duration: 0.5, delay: 0.1 } },
    });
  };

  const handleClickOnDragSurface = () => {
    if (showInfo) {
      handleItemClick({ isCenter: false });
    }
  };

  const handleSnapToCenter = () => {
    // Center of the viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // Center circle coordinates
    const centerX = (numberOfItems / 2) * icon.size;
    const centerY = (numberOfItems / 2) * icon.size;

    // Calculate offsets to center the grid based on the center circle position
    const offsetX = viewportCenterX - centerX;
    const offsetY = viewportCenterY - centerY;

    // Animate the grid's x and y to these offset values
    animate(circleX, 175, { type: 'spring', stiffness: 300 });
    animate(circleY, 175, { type: 'spring', stiffness: 300 });
  };

  return (
    <>
      {/* Radial bg overlay which makes the circles darker on the edges of the screen */}
      {/* <motion.div
        animate={{
          opacity: showInfo ? 0 : 1,
          transition: { type: 'tween', duration: 1.2 },
        }}
        className="explore-bg-overlay explore-bg-overlay-gradient absolute inset-0 z-10 pointer-events-none"
      /> */}

      {/* "Drag or tap to explore" banner */}
      {/* <Banner show={showBanner} /> */}

      {/** The purpose of this div parent wrapping the circle grid container is having a clicable area the size of the grid container
       * so when the user interacts with any point of it we can handle the closing of the card */}
      <motion.div
        className="relative size-full flex items-center justify-center"
        drag={showInfo}
        dragSnapToOrigin
        onDrag={handleClickOnDragSurface}
        onClickCapture={handleClickOnDragSurface}
      >
        <motion.div
          style={{
            width: gridSize,
            height: gridSize,
            x: planeX,
            y: planeY,
            // transform: 'translate(-50%, -50%)',
          }}
          drag={!showInfo}
          // top-1/2 left-1/2 absolute inset-0
          className="relative debug"
          animate={gridControls}
          onDragStart={() => {
            setShowBanner(false);
          }}
          onDrag={(event, info) => {
            // Actualizar los circulos
            console.log(info.point);
            console.log({ event, info });
          }}
          onDragEnd={handleSnapToCenter} // Call the function on drag end
        >
          {grid.map((rows, rowIndex) =>
            rows.map((colIndex) => (
              <Item
                key={`${rowIndex}-${colIndex}`}
                row={rowIndex}
                col={colIndex}
                planeX={planeX}
                planeY={planeY}
                x={circleX}
                y={circleY}
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
  x,
  y,
  onClick,
  showInfo,
}: Readonly<{
  row: number;
  col: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  planeX: MotionValue<number>;
  planeY: MotionValue<number>;
  showInfo: boolean;
  onClick: ({ isCenter }: { isCenter: boolean }) => void;
}>) {
  // Debug state, can be deleted later
  const [initialScale, setInitialScale] = useState<number>(1);
  const [debugScale, setDebugScale] = useState<number>(1);

  const opacity = useMotionValue(1);
  const controls = useAnimationControls();

  const scale = useMotionValue(1);

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

  const transformScaleOnX = useCallback(
    (v: number) => {
      // This is the distance from the current x point in drag plane + the position x of circle
      // We also add the circle radius cause we want to take the center of circle as reference, not the corner.
      const currentOffset = v + xOffset + icon.size / 2;
      const xRange = () => {
        return [0, gridSize / 2, gridSize];
      };

      const result = transform(xRange(), [0, 1, 0])(currentOffset);
      xScale.current = result;

      setDebugScale(Math.min(xScale.current, yScale.current));
      scale.set(Math.min(xScale.current, yScale.current));

      return result;
    },
    [xOffset],
  );

  const transformScaleOnY = useCallback(
    (v: number) => {
      // This is the distance from the current y point in drag plane + the position y of circle
      // We also add the circle radius cause we want to take the center of circle as reference, not the corner.
      const currentOffset = v + yOffset + icon.size / 2;
      const yRange = () => {
        return [0, gridSize / 2, gridSize];
      };
      const result = transform(yRange(), [0, 1, 0])(currentOffset);

      yScale.current = result;

      setDebugScale(Math.min(xScale.current, yScale.current));
      scale.set(Math.min(xScale.current, yScale.current));

      return result;
    },
    [yOffset],
  );

  useLayoutEffect(function setInitialState() {
    const xScale = transformScaleOnX(0);
    const yScale = transformScaleOnY(0);

    setInitialScale(Math.min(xScale, yScale));
  }, []);

  useLayoutEffect(
    function setScale() {
      // Set scale when the drag plan is moving
      planeY.on('change', transformScaleOnY);
      planeX.on('change', transformScaleOnX);

      const xScale = transformScaleOnX(0);
      const yScale = transformScaleOnY(0);

      setInitialScale(Math.min(xScale, yScale));
    },
    [planeX, planeY, scale, xOffset, yOffset, controls, opacity],
  );

  const centerY = Math.floor(numberOfItems / 2);
  const centerX = Math.floor(numberOfItems / 2);
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
      {`${row}-${col}`}
      <br />
      {debugScale.toFixed(2)}
    </motion.button>
  );
}
