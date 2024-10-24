import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MotionImage = motion.create(Image);
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

const ITEMS: Step[] = [
  { type: 'init', text: 'Spotify sync', image: '' },
  {
    type: 'step',
    text: 'Tempo is a music discovery tool for your stay.',
    image: '/whotels/illustration/onboarding/onboarding-1.png',
  },
  {
    type: 'step',
    text: 'Tempo combines expert curation from tastemakers.',
    image: '/whotels/illustration/onboarding/onboarding-2.png',
  },
  {
    type: 'step',
    text: 'Tempo combines environmental factors, like the weather and time of day.',
    image: '/whotels/illustration/onboarding/onboarding-3.png',
  },
  {
    type: 'step',
    text: 'Tempo combines your music preferences, like mood and energy.',
    image: '/whotels/illustration/onboarding/onboarding-4.png',
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
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step === ITEMS.length - 1) {
      onSyncEnd();
    }
    const interval = setInterval(() => {
      setStep(step + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [step, onSyncEnd]);

  const currentStep = ITEMS[step];

  return (
    <main className="bg-black text-white size-full h-svh items-center justify-center flex">
      <AnimatePresence initial={false} mode="wait">
        {currentStep.type === 'init' && (
          <motion.p
            key={step}
            variants={textVariants}
            exit="exit"
            initial="enter"
            animate="center"
            className="size-full absolute inset-0  flex items-center justify-center type-headline-4"
          >
            {currentStep.text}
          </motion.p>
        )}
        {currentStep.type === 'step' && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="size-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <MotionImage
                  key={step}
                  width={320}
                  height={320}
                  src={currentStep.image}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  alt=""
                />
              </AnimatePresence>
            </div>
            <div className="mb-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={step}
                  className="text-balance mb-3 type-body-1"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {currentStep.text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        )}
        {currentStep.type === 'end' && (
          <motion.p
            key={step}
            variants={textVariants}
            exit="exit"
            initial="enter"
            animate="center"
            className="size-full absolute inset-0  flex items-center justify-center type-headline-4"
          >
            {currentStep.text}
          </motion.p>
        )}
      </AnimatePresence>
    </main>
  );
}
