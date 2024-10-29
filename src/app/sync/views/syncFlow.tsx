import { Header } from '@/components/header';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const MotionImage = motion(Image);
type Step = {
  type: 'init' | 'step' | 'end';
  text: string;
  src: string;
  duration?: number;
};

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
  enter: {},
  center: {
    transition: {
      duration: 1,
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  exit: {},
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

const loadingVariants = {
  enter: {
    opacity: 1,
    transition,
  },
  center: {
    scale: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: 1,
    },
    rotate: [0, 360],
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      opacity: { duration: 0.5 },
      scale: { delay: 0.1, duration: 0.5 },
    },
  },
};

const ITEMS: Step[] = [
  { type: 'init', text: 'Spotify sync', src: '' },
  {
    type: 'step',
    text: 'Tempo is a music discovery tool for your stay.',
    src: '/whotels/video/sync/pillars.webm',
    duration: 4000,
  },
  {
    type: 'step',
    text: 'Tempo combines expert curation from tastemakers.',
    src: '/whotels/video/sync/pillars.webm',
    duration: 4000,
  },
  {
    type: 'step',
    text: 'Tempo combines environmental factors, like the weather and time of day.',
    src: '/whotels/video/sync/pillars.webm',
    duration: 4000,
  },
  {
    type: 'step',
    text: 'Tempo combines your music preferences, like mood and energy.',
    src: '/whotels/video/sync/pillars.webm',
    duration: 4000,
  },
  {
    type: 'end',
    text: 'Finalizing',
    src: '/whotels/img/loading.png',
  },
];

export default function SyncExperience({
  onSyncEnd,
}: Readonly<{
  onSyncEnd: () => void;
}>) {
  const [step, setStep] = useState(0);
  const currentStep = ITEMS[step];

  useEffect(() => {
    const interval = setInterval(() => {
      if (step === 3 - 1) {
        // onSyncEnd();
      } else {
        setStep(step + 1);
      }
    }, currentStep?.duration ?? 3000);

    return () => clearInterval(interval);
  }, [step, onSyncEnd]);

  return (
    <div className="flex flex-col bg-black">
      <AnimatePresence>
        {step > 0 && (
          <motion.div
            animate={{ opacity: 0.7 }}
            initial={{ opacity: 0 }}
            className="z-0 absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]"
          ></motion.div>
        )}
      </AnimatePresence>

      <Header className="absolute inset-x-0 z-10" />
      <main className="bg-black text-white size-full h-svh items-center justify-center flex overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep.type === 'init' && (
            <motion.p
              key={step}
              variants={textVariants}
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
              key={step}
              className="flex flex-col size-full"
              variants={parentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="z-10 size-full flex items-center justify-center">
                <video
                  playsInline
                  controls={false}
                  autoPlay
                  muted
                  disablePictureInPicture
                >
                  <source src={currentStep.src} type="video/webm" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <motion.p
                key={`text-${step}`}
                className="text-balance type-label-1 text-white z-10 h-24 px-4 pt-4 py-10 text-center"
                variants={textVariants}
              >
                {currentStep.text}
              </motion.p>
            </motion.div>
          )}

          {currentStep.type === 'end' && (
            <motion.div
              key={step}
              className="flex flex-col size-full bg-[url('/whotels/img/sync/step-bg.png')] bg-center"
              variants={parentVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="size-full flex items-center justify-center">
                <MotionImage
                  key={`image-${step}`}
                  width={100}
                  height={100}
                  src={currentStep.src}
                  variants={loadingVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  alt=""
                />
              </div>
              <div className="text-white z-10 h-24 px-4 pt-4 py-10 text-center">
                <motion.p
                  key={`text-${step}`}
                  className="text-balance type-label-1"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {currentStep.text}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
