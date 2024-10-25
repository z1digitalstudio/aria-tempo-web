import { SVGComponent, WithClassName } from '@/types';
import { ButtonHTMLAttributes } from 'react';

export function ButtonIcon({
  label,
  Icon,
  className,
  ...props
}: WithClassName<
  {
    label: string;
    Icon: SVGComponent;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>) {
  return (
    <button className={className} {...props}>
      <span className="sr-only">{label}</span>
      <Icon />
    </button>
  );
}
