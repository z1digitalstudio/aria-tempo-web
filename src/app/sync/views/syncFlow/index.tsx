import { Header } from '@/components/header';
import { VideoWithTransparency } from '@/components/video';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { animate } from './animation';
import { SECTIONS } from './constants';

/**
 * This sync animated flow has 3 sections:
 * - Init: Black screen with "Spotify sync"
 * - Loop: Animation stepper
 * - End: Small loading animation
 *
 * Notes from Reese about the syncing video:
 * 1. “Spotify sync” is a placeholder for the Spotify permissions page that will come up (we’ll be redirected out of the Tempo app temporarily)
 * 2. Once data is collected and analyzed, we will want to take the user to the full experience as soon as possible rather than wait for the full video to play
 */

const getProgressPercentage = (sectionIndex: number, stepIndex: number) => {
  const sectionsWithSteps = SECTIONS.filter((s) => s.type === 'step');

  const totalOfSteps = sectionsWithSteps.reduce((acc, section) => {
    const innerSteps = section.steps;
    if (innerSteps?.length) {
      return acc + innerSteps.length;
    }

    return acc + 1;
  }, 0);

  const currentStep = sectionIndex + stepIndex;

  return `${(100 / totalOfSteps) * currentStep}%`;
};

export default function SyncExperience({
  onSyncEnd,
}: Readonly<{
  onSyncEnd: () => void;
}>) {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const currentSection = SECTIONS[sectionIndex];

  useEffect(() => {
    let innerStepsInterval: NodeJS.Timeout;

    const interval = setInterval(() => {
      const isFinalSection = sectionIndex === SECTIONS.length - 1;

      if (isFinalSection) {
        clearInterval(interval);
        clearInterval(innerStepsInterval);
        onSyncEnd();
        setSectionIndex(sectionIndex);
        setStepIndex(0);
      } else {
        setSectionIndex((prev) => prev + 1);
      }
    }, currentSection.duration);

    if ('steps' in currentSection && currentSection?.steps?.length) {
      innerStepsInterval = setInterval(() => {
        setStepIndex((prev) => prev + 1);
      }, currentSection.duration / currentSection.steps.length);
    }

    return () => {
      clearInterval(interval);
      clearInterval(innerStepsInterval);
    };
  }, [onSyncEnd, sectionIndex, currentSection]);

  return (
    <div className="flex flex-col bg-black size-full h-svh text-white overflow-hidden">
      <AnimatePresence>
        {currentSection.type !== 'spotify-placeholder' && (
          <motion.div
            animate={{ opacity: 0.7 }}
            initial={{ opacity: 0 }}
            className="absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentSection.type !== 'spotify-placeholder' && (
          <div className="relative flex z-30">
            <Header className="w-full absolute" />
            <motion.span
              initial={false}
              className="bg-white h-[1px] w-full absolute inset-x-0 top-20"
              animate={{
                width: getProgressPercentage(sectionIndex, stepIndex),
              }}
              transition={{ duration: 1 }}
            ></motion.span>
          </div>
        )}
      </AnimatePresence>
      <main
        style={{
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0,0,0,0.5) 100%)',
        }}
        className="z-10 text-white size-full h-svh items-center justify-center flex overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {currentSection.type === 'spotify-placeholder' && (
            <motion.p
              key={sectionIndex}
              variants={animate.init}
              exit="exit"
              initial="enter"
              animate="center"
              className="size-full flex items-center justify-center type-headline-4"
            >
              {currentSection.text}
            </motion.p>
          )}

          {currentSection.type === 'step' && (
            <motion.div
              key={sectionIndex}
              className="flex flex-col size-full"
              exit="exit"
              initial="enter"
              animate="center"
            >
              <div className="z-10 size-full flex items-start pt-24 justify-center">
                <div className="relative size-[20rem]">
                  <VideoWithTransparency
                    mp4Src={currentSection.video.mp4Src}
                    webmSrc={currentSection.video.webmSrc}
                    className="size-full absolute top-0 left-0"
                  />
                </div>
              </div>
              {currentSection.text && (
                <motion.p
                  variants={animate.text}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-balance type-label-1 text-white z-10 h-24 px-4 pt-4 py-10 text-center"
                >
                  {currentSection.text}
                </motion.p>
              )}
              {currentSection.steps?.length && (
                <AnimatePresence mode="wait">
                  <motion.p
                    variants={animate.text}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    key={`${sectionIndex}-${stepIndex}`}
                    className="text-balance type-label-1 text-white z-10 h-24 px-4 pt-4 py-10 text-center"
                  >
                    {currentSection.steps[stepIndex]}
                  </motion.p>
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
