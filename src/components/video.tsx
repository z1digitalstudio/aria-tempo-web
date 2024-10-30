/**
 * Video component
 *
 * We have a lot of videos with transparent background for animations and motion elements.
 * This type of file can be have issues with masks and transparency on some devices and browsers.
 *
 * To ensure best cross-browsing experience possible, we need to pass to formats for this videos:
 * hevc mp4 for Safari and vp9 webm for Chrome.
 *
 * More info: https://stackoverflow.com/questions/70042522/html5-transparent-video-with-the-greatest-cross-browser-system-support
 **/

import { WithClassName } from '@/types';
import { useEffect, useRef } from 'react';

type VideoProps = {
  play?: boolean; // deactivates autoplay, play video imperatevely
};

type VideoSource = { path: string; type?: string };
type VideoOptions = string | VideoSource | VideoSource[];

function isVideoSource(src: VideoOptions): src is VideoSource {
  return typeof src !== 'string' && 'path' in src;
}

export function Video({
  src,
  className,
  play,
}: WithClassName<
  {
    src: VideoOptions;
  } & VideoProps
>) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initialPlay = useRef(play);
  const isNotArray = isVideoSource(src) || typeof src === 'string';

  const srcs = isNotArray ? [src] : src;

  useEffect(() => {
    if (play && videoRef.current) videoRef.current.play();
  }, [play]);

  if (isNotArray ? !src : !src.length) {
    console.error('Video missing source files');
    return;
  }

  return (
    <video
      playsInline
      controls={false}
      autoPlay={initialPlay.current}
      muted
      disablePictureInPicture
      className={className}
      ref={videoRef}
    >
      {srcs.map((s) => {
        if (typeof s === 'string') {
          return <source key={s} src={s} />;
        }
        return <source key={s.path} src={s.path} type={s.type} />;
      })}
      Your browser does not support the video tag.
      {/* A11y note: If the video provides important content or context, we should learn about how to add captions to give this info to users with disabilities. More: https://www.w3.org/WAI/media/av/planning/ */}
    </video>
  );
}

export type VideoWithTransparency = {
  mp4Src: string;
  webmSrc: string;
};

export const VideoWithTransparency = ({
  mp4Src,
  webmSrc,
  className,
  ...videoProps
}: WithClassName<VideoWithTransparency & VideoProps>) => {
  const sources = [
    { path: mp4Src, type: 'video/mp4; codecs="hvc1"' },
    { path: webmSrc, type: 'video/webm' },
  ];
  return <Video src={sources} className={className} {...videoProps} />;
};
