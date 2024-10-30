import { Section } from './type';

export const SECTIONS: Section[] = [
  /**
   * The spotify placeholder step is here only for demo purposes. It represent the external connection to spotify and can be removed later
   */
  { type: 'spotify-placeholder', duration: 2000, text: 'Spotify sync' },
  {
    type: 'step',
    duration: 17000,
    video: {
      webmSrc: '/whotels/video/sync/1-loop.webm',
      mp4Src: '/whotels/video/sync/1-loop.mp4',
    },
    steps: [
      'Tempo is a music discovery tool for your stay.',
      'Tempo combines expert curation from tastemakers.',
      'Tempo combines environmental factors, like the weather and time of day.',
      'Tempo combines your music preferences, like mood and energy.',
    ],
  },
  {
    type: 'step',
    duration: 2000,
    video: {
      webmSrc: '/whotels/video/sync/5-loading.webm',
      mp4Src: '/whotels/video/sync/5-loading.mp4',
    },
    text: 'Finalizing...',
  },
];
