import clsx from 'clsx';
import { BaseProps, ButtonVariant } from './type';

const variants: { [variant in ButtonVariant]: string } = {
  primary: 'bg-black text-creme',
  secondary: 'bg-creme text-black',
};

export const getButtonClassName = ({
  variant = 'primary',
  isFullWidth,
}: Pick<BaseProps, 'isFullWidth' | 'variant'>) =>
  clsx(
    isFullWidth && 'w-full',
    variants[variant],
    'type-label-1 flex gap-3 uppercase py-3 px-4 rounded-lg justify-center text-sm tracking-tight items-center',
  );
