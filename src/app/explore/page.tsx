'use client';

import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { links } from '@/utils/links';
import { Grid } from './components/grid';
import { useSearchParams } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { ButtonIcon } from '@/components/buttonIcon';
import CloseIcon from '@/assets/icons/close.svg';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

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

export default function Explore() {
  const searchParams = useSearchParams();
  const showResult = searchParams.get('showResult');
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
        className="w-full md:max-w-xl max-md:h-[75svh] backdrop:bg-black/60 text-creme border border-[#a59078] p-2 open:animate-modalf"
        style={{
          background:
            'radial-gradient(243.85% 120.74% at 47.97% -47.5%, #40382E 0%, #000000 100%)',
        }}
      >
        <div className="relative border border-creme p-6 text-center size-full flex flex-col items-center pb-12">
          <ButtonIcon
            Icon={CloseIcon}
            label="Close modal"
            autoFocus
            className="absolute top-4 right-4"
            onClick={closeModal}
          >
            Close
          </ButtonIcon>
          <p className="type-label-1">Your unique score</p>
          <p className="type-number mb-8">94.6</p>
          <Image
            width={240}
            height={240}
            src={'/whotels/img/explore/shape.png'}
            alt=""
          />
        </div>
      </dialog>
      <main className="size-full flex-1 flex flex-col minv-h-0">
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
