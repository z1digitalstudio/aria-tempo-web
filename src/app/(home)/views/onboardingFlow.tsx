'use client';

// Based on https://codesandbox.io/p/sandbox/framer-motion-image-gallery-pqvx3?from-embed

import { WithClassName } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/cta/button';

function createArrayOfSize(n: number) {
  return new Array(n).fill(undefined);
}

const MotionImage = motion.create(Image);

const textVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

const imageVariants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 300 : -300,
      opacity: 0,
    };
  },
};

const transition = {
  opacity: { duration: 2, delay: 0.1 },
  y: {
    duration: 3,
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

const dragProperties = {
  drag: 'x',
  dragConstraints: { left: 0, right: 0 },
  dragElastic: 1,
} as const;

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ITEMS = [
  {
    text: 'Tempo is a music discovery tool for your stay.',
    image: '/whotels/img/onboarding/onboarding-1.png',
  },
  {
    text: 'Tempo combines expert curation from tastemakers.',
    image: '/whotels/img/onboarding/onboarding-2.png',
  },
  {
    text: 'Tempo combines environmental factors, like the weather and time of day.',
    image: '/whotels/img/onboarding/onboarding-3.png',
  },
  {
    text: 'Tempo combines your music preferences, like mood and energy.',
    image: '/whotels/img/onboarding/onboarding-4.png',
  },
];

export function OnboardingCarousel({
  autoplay,
  onStart,
}: WithClassName<{
  autoplay: boolean | number;
  onStart: () => void;
}>) {
  const [[page, direction], setPage] = useState([0, 0]);
  const navigate = useCallback((n: number) => {
    const getNewPage = (page: number, direction: number) => {
      // Handle limits
      if (page === ITEMS.length && direction) return 0;
      if (page === -1 && direction === -1) return ITEMS.length - 1;

      return page;
    };
    setPage(([prevPage]) => {
      const newDirection = prevPage < n ? 1 : -1;
      const newPage = getNewPage(n, newDirection);
      return [newPage, newDirection];
    });
  }, []);

  const handleDrag = (
    e: MouseEvent | TouchEvent | PointerEvent,
    { offset, velocity }: PanInfo,
  ) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      navigate(page + 1);
    } else if (swipe > swipeConfidenceThreshold) {
      navigate(page - 1);
    }
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(
      () => {
        navigate(page + 1);
      },
      typeof autoplay === 'number' ? autoplay : 5000,
    );

    return () => clearInterval(interval);
  }, [page, autoplay, navigate]);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <main className="flex flex-col h-full">
        <div className="size-full flex items-center justify-center">
          <MotionImage
            key={page}
            width={320}
            height={320}
            custom={direction}
            src={ITEMS[page].image}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            alt=""
            transition={transition}
            {...dragProperties}
            onDragEnd={handleDrag}
          />
        </div>
        <section className="bg-creme mt-auto text-black pt-10 pb-4 px-4 border-b-white border-b border-opacity-20 text-xl/6 text-center">
          <div className="mb-10">
            <motion.p
              key={page}
              custom={direction}
              className="text-balance mb-3 type-body-1 h-20"
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
              {...dragProperties}
              onDragEnd={handleDrag}
            >
              {ITEMS[page].text}
            </motion.p>
            <nav className="flex gap-2 w-full items-center justify-center">
              {createArrayOfSize(ITEMS.length).map((_, i) => (
                <button
                  key={i}
                  data-page={i}
                  className={clsx(
                    'size-[5px] rounded-full bg-black',
                    page !== i && 'opacity-20',
                  )}
                  onClick={() => navigate(i)}
                ></button>
              ))}
            </nav>
          </div>

          <div className="flex gap-2 flex-col">
            <Button label="Get Started" isFullWidth onClick={onStart} />
          </div>
        </section>
      </main>
    </AnimatePresence>
  );
}
