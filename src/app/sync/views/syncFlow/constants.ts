import { Section } from './type';

export const SECTIONS: Section[] = [
  { type: 'init', steps: [{ text: 'Spotify sync', duration: 3000 }] },
  {
    type: 'loop',
    steps: [
      {
        text: 'Tempo is a music discovery tool for your stay.',
        webmSrc: '/whotels/video/sync/1-pillars.webm',
        mp4Src: '/whotels/video/sync/1-pillars.mp4',
        duration: 3500,
      },
      {
        text: 'Tempo combines expert curation from tastemakers.',
        webmSrc: '/whotels/video/sync/2-environmental.webm',
        mp4Src: '/whotels/video/sync/2-environmental.mp4',
        duration: 5500,
      },
      {
        text: 'Tempo combines environmental factors, like the weather and time of day.',
        webmSrc: '/whotels/video/sync/3-weather.webm',
        mp4Src: '/whotels/video/sync/3-weather.mp4',
        duration: 5500,
      },
      {
        text: 'Tempo combines your music preferences, like mood and energy.',
        webmSrc: '/whotels/video/sync/4-personal.webm',
        mp4Src: '/whotels/video/sync/4-personal.mp4',
        duration: 5500,
      },
    ],
  },
  {
    type: 'end',
    steps: [
      {
        text: 'Finalizing...',
        webmSrc: '/whotels/video/sync/5-loading.webm',
        mp4Src: '/whotels/video/sync/5-loading.mp4',
        duration: 3000,
      },
    ],
  },
];
