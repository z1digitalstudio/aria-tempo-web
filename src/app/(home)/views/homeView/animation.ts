const rootVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.5,
    },
  },
};

const headerVariants = {
  enter: {
    y: -100,
  },
  center: {
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const infoVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const titleVariants = {
  enter: {
    y: 20,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
    },
  },
};

const footerVariants = {
  enter: {
    y: 20,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
    },
  },
};

const divVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const animate = {
  root: rootVariants,
  header: headerVariants,
  content: divVariants,
  info: infoVariants,
  title: titleVariants,
  footer: footerVariants,
};
