import clsx from 'clsx';
import { BaseProps, ButtonVariant } from './type';

const variants: { [variant in ButtonVariant]: string } = {
  primary: 'bg-black text-creme dark:bg-creme dark:text-black',
  secondary:
    'bg-creme text-black border border-opacity-50 border-black dark:bg-black dark:text-creme dark:border-creme dark:border-opacity-50',
};

export const getButtonClassName = ({
  variant = 'primary',
  theme = 'light',
  outline = true,
  isFullWidth,
}: BaseProps) =>
  clsx(
    isFullWidth && 'w-full',
    theme === 'dark' && 'dark',
    variants[variant],
    outline === false && 'border-none',
    'type-label-1 flex gap-3 uppercase py-3 px-4 rounded-lg justify-center text-sm tracking-tight items-center',
  );
