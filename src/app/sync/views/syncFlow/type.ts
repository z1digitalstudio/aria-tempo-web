import type { VideoWithTransparency } from '@/components/video';

export type Section =
  | {
      type: 'spotify-placeholder';
      duration: number;
      text: string;
    }
  | {
      type: 'step';
      duration: number;
      video: VideoWithTransparency;
      steps?: string[];
      text?: string;
    };
