'use client';

import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Button } from '@/components/Button';
import { useEffect, useState } from 'react';
import { createArrayOfSize } from './(home)/components/Carousel';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const MotionImage = motion.create(Image);

const CAROUSEL_ITEMS = [
  'Tempo is a music discovery tool for you to stay.',
  'Tempo combines expert curation from tastemakers.',
  'Tempo combines environmental factors, like the weather and time of day.',
  'Tempo combines environmental factors, like the weather and time of day.',
];

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

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Home() {
  const [[page, direction], setPage] = useState([0, 0]);
  const items = CAROUSEL_ITEMS;
  const go = (n: number) => {
    const getNewPage = (page: number, direction: number) => {
      // Handle limits
      if (page === items.length && direction) return 0;
      if (page === -1 && direction === -1) return items.length - 1;

      return page;
    };
    setPage(([prevPage]) => {
      const newDirection = prevPage < n ? 1 : -1;
      const newPage = getNewPage(n, newDirection);
      return [newPage, newDirection];
    });
  };

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      go(page + 1); // Automatically go to the next page
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [page]); // Re-run effect when `page` changes

  return (
    <main className="size-full h-screen overflow-hidden text-white bg-black relative">
      <div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:190%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]" />
      <div className="z-10 relative flex flex-col h-full">
        <header className="flex justify-between items-center py-8 px-4 max-w-5xl border-b-white border-b border-opacity-20">
          <div className="flex items-center">
            <Logo />
            <h1 className="mt-[0.1rem] font-helios uppercase text-sm/6 before:border-l before:pr-2 before:ml-2">
              Tempo
            </h1>
          </div>
          <ButtonIcon Icon={MenuIcon} label="Open menu" />
        </header>
        <AnimatePresence initial={false} custom={direction}>
          <div className="flex flex-col h-full">
            <div className="size-full flex items-center justify-center">
              <MotionImage
                key={page}
                width={320}
                height={320}
                custom={direction}
                src={`/whotels/illustration/onboarding/onboarding-${page + 1}.png`}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                alt=""
                transition={{
                  opacity: { duration: 2, delay: 0.1 },
                  y: {
                    duration: 3,
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    go(page + 1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    go(page - 1);
                  }
                }}
              />
            </div>
            <section className="bg-creme mt-auto text-black pt-10 pb-4 px-4 max-w-5xl border-b-white border-b border-opacity-20 text-xl/6 text-center">
              <div className="mb-10">
                <motion.p
                  key={page}
                  custom={direction}
                  className="text-balance mb-3 type-body-1 h-20"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    opacity: { duration: 1, delay: 0.1 },
                    x: {
                      duration: 2,
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      go(page + 1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      go(page - 1);
                    }
                  }}
                >
                  {items[page]}
                </motion.p>
                <nav className="flex gap-2 w-full items-center justify-center">
                  {createArrayOfSize(items.length).map((_, i) => (
                    <button
                      key={i}
                      data-page={i}
                      className={clsx(
                        'size-[5px] rounded-full bg-black',
                        page !== i && 'opacity-20',
                      )}
                      onClick={() => go(i)}
                    ></button>
                  ))}
                </nav>
              </div>

              <div className="flex gap-2 flex-col">
                <Button label="Get Started" isFullWidth />
              </div>
            </section>
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}
