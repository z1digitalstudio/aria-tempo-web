import { AnimatePresence, motion } from 'framer-motion';
import { ringCardVariants } from './animation';

export const Card = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
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
          <div className="border border-creme p-6 text-center">
            <p className="type-label-1">Your unique score</p>
            <p className="type-number">94.6</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
