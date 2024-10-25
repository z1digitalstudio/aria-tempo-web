export const ringCardVariants = {
  enter: {
    y: 200,
    opacity: 0,
  },
  center: {
    y: 5,
    opacity: 1,
    transition: {
      opacity: { duration: 0.5 },
      y: { duration: 0.5 },
    },
  },
  exit: {
    scale: 0.95,
    y: 200,
    opacity: 0,
    transition: {
      y: { duration: 0.5 },
      opacity: { duration: 0.5, delay: 0.2 },
    },
  },
};
