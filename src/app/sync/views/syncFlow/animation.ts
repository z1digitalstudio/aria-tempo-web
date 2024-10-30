export const transition = {
  opacity: { duration: 2, delay: 0.1 },
  y: {
    duration: 3,
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

const textVariants = {
  enter: {
    x: 300,
    opacity: 0,
    transition,
  },
  center: {
    zIndex: 1,
    x: 0,
    scale: 1,
    opacity: 1,
    transition,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
    scale: 0.95,
    y: 5,
    transition: {
      opacity: { duration: 0.5 },
      scale: { delay: 0.1, duration: 0.5 },
      y: { delay: 0.2, duration: 0.5 },
    },
  },
};

export const animate = {
  init: textVariants,
  text: textVariants,
};
