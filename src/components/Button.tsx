import { SVGComponent, WithClassName } from '@/types';
import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export function Button({
  label,
  Icon,
  className,
  variant = 'primary',
  isFullWidth = false,
  ...props
}: WithClassName<
  {
    label: string;
    Icon?: SVGComponent;
    variant?: 'primary' | 'secondary';
    isFullWidth?: boolean;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>) {
  const variants = {
    primary: 'bg-black text-creme',
    secondary: 'bg-creme text-black',
  };

  return (
    <button
      className={clsx(
        className,
        variants[variant],
        isFullWidth && 'w-full',
        'flex gap-3 uppercase py-3 px-4 rounded-lg justify-center text-sm tracking-tight items-center',
      )}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
}
