import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  /**
   * Setting dark mode to manual because this app doesn't have themes, so we don't need to listen for user preferences.
   * We only need the dark class to control the styles at component level (ex button)
   *
   * Docs: https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
   **/

  darkMode: 'selector',
  content: ['./src/**/*.{ts,tsx,svg}'],
  theme: {
    colors: {
      creme: {
        DEFAULT: 'var(--color-creme)',
        dark: 'var(--color-creme-dark)',
      },
      black: {
        DEFAULT: '#000',
        medium: '#111111',
        light: '#292929',
      },
      white: '#ffffff',
      colorFocus: '#7B67D3',
    },
    fontFamily: {
      helios: ['var(--font-helios)'],
      wsupreme: ['var(--font-wsupreme)'],
    },
    extend: {
      backgroundImage: {
        'whotels-splash': "url('/whotels/img/splash.png')",
      },
      animation: {
        modalf: 'modalf 0.15s ease-in-out',
      },
      keyframes: {
        modalf: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  plugins: [
    /**
     * Typographic styles
     *
     * Ideally, this should have been added to the main.css file as classes in the layer utility
     * But there's an issue with that approach: classes won't be picked up by intellisense, we won't have autocompletion:
     * - Reported here: https://github.com/tailwindlabs/tailwindcss-intellisense/issues/227
     * So this is a workaround solution, also described in this same issue thread 👆
     **/

    plugin(function ({ addUtilities }) {
      addUtilities({
        // Typographic styles
        '.type-number': {
          '@apply font-wsupreme font-normal text-[6.25rem] leading-[1.4] tracking-[-4%]':
            {},
        },
        '.type-headline-0': {
          '@apply font-helios uppercase text-[4.375rem] leading-[1]': {},
        },
        '.type-headline-1': {
          '@apply font-helios uppercase text-[2.375rem] leading-[1]': {},
        },
        '.type-headline-2': {
          '@apply font-wsupreme font-medium uppercase text-[2.5rem] leading-[1.1] tracking-[-4%]':
            {},
        },
        '.type-headline-3': {
          '@apply font-wsupreme font-normal text-[1.75rem] leading-[1.1] tracking-[-3%]':
            {},
        },
        '.type-headline-4': {
          '@apply font-wsupreme font-normal text-[1.5rem] leading-[1.1] tracking-[-0.06rem]':
            {},
        },
        '.type-body-1': {
          '@apply font-wsupreme font-normal text-[1.3125rem] leading-[1.1] tracking-[-0.04rem]':
            {},
        },
        '.type-body-2': {
          '@apply font-wsupreme font-normal text-[1rem] leading-[1.4] tracking-[-0.04rem]':
            {},
        },
        '.type-body-3': {
          '@apply font-wsupreme font-medium text-[0.875rem] leading-[1.1] tracking-[-0.0175rem]':
            {},
        },
        '.type-body-4': {
          '@apply font-helios text-[0.875rem] leading-[2]': {},
        },
        '.type-label-1': {
          '@apply font-wsupreme font-medium uppercase text-[0.875rem] leading-[1.4] tracking-[-0.035rem]':
            {},
        },
        '.type-label-2': {
          '@apply font-wsupreme font-medium text-[0.75rem] leading-[1.1] tracking-[-0.03rem]':
            {},
        },
      });
    }),
  ],
};

export default config;
