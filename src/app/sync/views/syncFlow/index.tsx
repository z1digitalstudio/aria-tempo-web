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
 * Total time of reproduction of loop is 21 seconds. That's a lot, probably async fetching of data won't take that long.
 * So when we connect this to the async call we stuck the user in the loop, and as soon as data is ready, we show the end section and get out of this flow.
 *
 * TODO: Edit this coment to make it make sense when the async call is connected :)
 */

const getProgressPercentage = ([sectionIndex, stepIndex]: [number, number]) => {
  const totalOfSteps = SECTIONS.reduce(
    (acc, section) => acc + section.steps.length,
    0,
  );

  const currentStep =
    SECTIONS[Math.abs(sectionIndex - 1)].steps.length + stepIndex;

  return `${(100 / totalOfSteps) * (currentStep + 1)}%`;
};

export default function SyncExperience({
  onSyncEnd,
}: Readonly<{
  onSyncEnd: () => void;
}>) {
  const [progress, setProgress] = useState<[number, number]>([0, 0]);
  const [sectionIndex, stepIndex] = progress;

  const currentSection = SECTIONS[sectionIndex];
  const steps = currentSection.steps;
  const currentStep = steps[stepIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      const isFinalStep = stepIndex === steps.length - 1;
      const isFinalSection = sectionIndex === SECTIONS.length - 1;

      if (isFinalSection && isFinalStep) {
        setProgress(([section, step]) => [section, step]);
        clearInterval(interval);
        onSyncEnd();
      } else if (isFinalStep) {
        setProgress(([section]) => [section + 1, 0]);
      } else {
        setProgress(([section, step]) => [section, step + 1]);
      }
    }, currentStep.duration);

    return () => clearInterval(interval);
  }, [onSyncEnd, steps, sectionIndex, stepIndex, currentStep.duration]);

  return (
    <div className="flex flex-col bg-black">
      <AnimatePresence>
        {currentSection.type !== 'init' && (
          <motion.div
            animate={{ opacity: 0.7 }}
            initial={{ opacity: 0 }}
            className="absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentSection.type !== 'init' && (
          <div className="relative flex z-30">
            <Header className="w-full absolute" />
            <motion.span
              initial={false}
              className="bg-white h-[1px] w-full absolute inset-x-0 top-20"
              animate={{
                width: getProgressPercentage(progress),
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
          {currentSection.type === 'init' && (
            <motion.p
              key={`${sectionIndex}-${stepIndex}`}
              variants={animate.init}
              exit="exit"
              initial="enter"
              animate="center"
              className="size-full flex items-center justify-center type-headline-4"
            >
              {currentStep.text}
            </motion.p>
          )}
          {(currentSection.type === 'loop' ||
            currentSection.type === 'end') && (
            <motion.div
              key={`${sectionIndex}-${stepIndex}`}
              className="flex flex-col size-full"
              variants={animate.root}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="z-10 size-full flex items-start pt-24 justify-center">
                <div className="relative size-[20rem]">
                  {'mp4Src' in currentStep && (
                    <VideoWithTransparency
                      mp4Src={currentStep.mp4Src}
                      webmSrc={currentStep.webmSrc}
                      className="size-full absolute top-0 left-0"
                    />
                  )}
                </div>
              </div>
              <motion.p
                key={`text-${currentStep}`}
                className="text-balance type-label-1 text-white z-10 h-24 px-4 pt-4 py-10 text-center"
                variants={animate.text}
              >
                {currentStep.text}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
