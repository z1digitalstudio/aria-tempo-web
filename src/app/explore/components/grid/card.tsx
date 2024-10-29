import { AnimatePresence, motion } from 'framer-motion';
import { ringCardVariants } from './animation';
import type { Card as CardType } from '.';

export const Card = ({ cardInfo }: { cardInfo: CardType | null }) => {
  return (
    <AnimatePresence>
      {cardInfo && (
        <motion.div
          className="text-creme absolute -bottom-4 inset-x-4 border border-[#a59078] p-2 z-20"
          style={{
            background: 'radial-gradient(#40382E 0%, #000000 100%)',
          }}
          variants={ringCardVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="border border-creme px-6 pt-6 pb-12 text-center flex flex-col gap-4">
            {/* <p className="type-label-1">Your unique score</p>
            <p className="type-number">94.6</p> */}

            <p className="type-label-1">{cardInfo.title}</p>
            <p className="type-headline-4">{cardInfo.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
