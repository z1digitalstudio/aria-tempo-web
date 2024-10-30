export type TextStep = { text: string; duration: number };
export type VideoStep = TextStep & {
  mp4Src: string;
  webmSrc: string;
};

export type Section =
  | {
      type: 'init';
      steps: TextStep[];
    }
  | {
      type: 'loop';
      steps: VideoStep[];
    }
  | {
      type: 'end';
      steps: VideoStep[];
    };
