'use client';

import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { VideoWithTransparency } from '@/components/video';

const VIDEO_DURATION = 4000;

export const SplashScreen = ({ onEnd }: { onEnd: () => void }) => {
  const [scope, animate] = useAnimate();
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    async function playSequence() {
      await animate(
        '.text-1',
        { opacity: 1, y: -20 },
        { opacity: { duration: 0.8 }, y: { duration: 1 } },
      );
      await animate(
        '.text-1',
        { opacity: 0, y: 0 },
        { duration: 0.5, delay: 1.5 },
      );
      await animate('.text-2', { opacity: 1 }, { duration: 1, delay: 0 });
      await animate('.text-2', { opacity: 0 }, { duration: 1, delay: 0.4 });
    }

    playSequence().then(() => {
      setPlayVideo(true);
      setTimeout(onEnd, VIDEO_DURATION);
    });
  }, [animate]);

  return (
    <div ref={scope} className="size-full relative">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: -20 }}
        transition={{ opacity: { duration: 0.8 }, y: { duration: 1 } }}
        className="text-1 absolute top-1/2 type-headline-3 h-10 -mt-10 inset-x-8 flex justify-center items-center"
      >
        Welcome to West Hollywood
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        className="text-2 absolute top-1/2 text-center type-label-1 h-10 flex justify-center items-center -mt-10 inset-x-8"
      >
        <span className="mr-3 ">W Hotels</span> presents
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: playVideo ? 1 : 0 }}
        className="tempo-video"
      >
        <VideoWithTransparency
          mp4Src="/whotels/video/splash.mp4"
          webmSrc="/whotels/video/splash.webm"
          play={playVideo}
        />
      </motion.div>
    </div>
  );
};
