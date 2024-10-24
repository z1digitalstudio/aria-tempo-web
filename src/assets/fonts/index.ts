import localFont from 'next/font/local';

const helios = localFont({
  src: './helios/heliosext.otf',
  variable: '--font-helios',
});

const wsupreme = localFont({
  src: [
    {
      path: './wsupreme/WSupremeWeb-Logo.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './wsupreme/WSupremeWeb-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-wsupreme',
});

export const fonts = { helios, wsupreme };
