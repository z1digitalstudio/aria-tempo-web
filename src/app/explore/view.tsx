'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { links } from '@/utils/links';
import { Grid } from './components/grid';
import { useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CardItem } from './components/grid/card';

const gridContainerVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.5 },
    },
  },
};

export function ExploreView({ showResult }: Readonly<{ showResult: string }>) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dialog = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (dialog.current instanceof HTMLDialogElement) {
      dialog.current.showModal();
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    if (dialog.current instanceof HTMLDialogElement) {
      dialog.current.close();
      setIsModalOpen(false);
    }
  };

  useLayoutEffect(() => {
    if (showResult) {
      openModal();
    }
  }, [showResult]);

  return (
    <div className="relative bg-black text-creme size-full h-svh flex flex-col">
      <Header />
      {/* 
      This is not way to handle modals. A modal system should be implemented using portals or similar and avoid repeating modal logic code.
      Check this out later - Parallel routes as a nextjs14 idiomatic way of implementing portals: 
      https://abdulmajid.hashnode.dev/creating-modals-in-nextjs-14-using-parallel-and-intercepting-routes
      Check also native modal element - dialog:
      https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
      */}
      <dialog
        ref={dialog}
        className="w-full md:max-w-xl max-md:h-[75svh] backdrop:bg-black/60 open:animate-modalf"
      >
        <CardItem
          cardInfo={{
            title: 'Your unique score',
            description: '94.6',
            isScore: true,
            src: '/whotels/img/explore/shape-2-2.png',
            category: 'all-genre',
          }}
          onClose={closeModal}
        />
      </dialog>
      <main className="size-full flex-1 flex flex-col min-h-0">
        <AnimatePresence>
          {!isModalOpen && (
            <motion.div
              variants={gridContainerVariants}
              initial="enter"
              animate="center"
              className="relative flex-1 overflow-hidden"
            >
              <Grid />
            </motion.div>
          )}
        </AnimatePresence>
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
