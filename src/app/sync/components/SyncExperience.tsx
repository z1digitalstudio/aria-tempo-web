import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MotionImage = motion(Image);
type Step = { type: 'init' | 'step' | 'end'; text: string; image: string };

const transition = {
  opacity: { duration: 2, delay: 0.1 },
  y: {
    duration: 3,
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

const parentVariants = {
  enter: {
    transition: {
      staggerChildren: 0.5, // Adjust the delay between children animations
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1, // You can also control stagger for exit
      staggerDirection: -1, // Children will animate in reverse order on exit
    },
  },
};

const childVariants = {
  enter: { opacity: 0, y: 50 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const variants = {
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

const ITEMS: Step[] = [
  { type: 'init', text: 'Spotify sync', image: '' },
  {
    type: 'step',
    text: 'Tempo is a music discovery tool for your stay.',
    image: '/whotels/img/onboarding/onboarding-1.png',
  },
  {
    type: 'step',
    text: 'Tempo combines expert curation from tastemakers.',
    image: '/whotels/img/onboarding/onboarding-2.png',
  },
  {
    type: 'step',
    text: 'Tempo combines environmental factors, like the weather and time of day.',
    image: '/whotels/img/onboarding/onboarding-3.png',
  },
  {
    type: 'step',
    text: 'Tempo combines your music preferences, like mood and energy.',
    image: '/whotels/img/onboarding/onboarding-4.png',
  },
  {
    type: 'end',
    text: 'Finalizing',
    image: '',
  },
];

export default function SyncExperience({
  onSyncEnd,
}: Readonly<{
  onSyncEnd: () => void;
}>) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (step === ITEMS.length - 1) {
        onSyncEnd();
      } else {
        setStep(step + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [step, onSyncEnd]);

  const currentStep = ITEMS[step];

  return (
    <main className="bg-black text-white size-full h-svh items-center justify-center flex">
      <AnimatePresence initial={false} mode="wait">
        {currentStep.type === 'init' && (
          <motion.p
            key={step}
            variants={variants}
            exit="exit"
            initial="enter"
            animate="center"
            className="size-full flex items-center justify-center type-headline-4"
          >
            {currentStep.text}
          </motion.p>
        )}

        {currentStep.type === 'step' && (
          <motion.div
            key={step} // Use key here to trigger AnimatePresence for the whole step
            className="flex flex-col size-full"
            variants={parentVariants} // Add the parent variants here
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="absolute size-full">
              <MotionImage
                key={`bg-${step}`} // Ensure unique key for this image
                fill
                variants={childVariants}
                initial="enter"
                animate="center"
                src="/whotels/img/sync/step-bg.png"
                alt=""
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="size-full flex items-center justify-center">
              <MotionImage
                key={`image-${step}`} // Ensure unique key for this image
                width={320}
                height={320}
                src={currentStep.image}
                variants={childVariants}
                initial="enter"
                animate="center"
                exit="exit"
                alt=""
              />
            </div>
            <div className="text-white z-10 h-24 px-4 pt-4 py-10 text-center">
              <motion.p
                key={`text-${step}`} // Ensure unique key for this text
                className="text-balance type-label-1"
                variants={childVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {currentStep.text}
              </motion.p>
            </div>
          </motion.div>
        )}

        {currentStep.type === 'end' && (
          <motion.p
            key={step}
            variants={variants}
            exit="exit"
            initial="enter"
            animate="center"
            className="size-full flex items-center justify-center type-headline-4"
          >
            {currentStep.text}
          </motion.p>
        )}
      </AnimatePresence>
    </main>
  );
}
