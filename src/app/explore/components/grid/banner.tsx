import { AnimatePresence, motion } from 'framer-motion';
import { bannerVariants } from './animation';

export const Banner = ({ show }: { show: boolean }) => {
  return (
    <AnimatePresence>
      {show && (
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
  );
};
