import { SVGComponent, WithClassName } from '@/types';
import { LinkProps as NextLinkProps } from 'next/link';
import { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export type BaseProps = {
  label: string;
  Icon?: SVGComponent;
  variant?: 'primary' | 'secondary';
  isFullWidth?: boolean;
};

export type ButtonProps = WithClassName<
  BaseProps & ButtonHTMLAttributes<HTMLButtonElement>
>;

export type ButtonLinkProps = WithClassName<BaseProps & NextLinkProps>;
