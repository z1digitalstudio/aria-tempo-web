import clsx from 'clsx';
import { getButtonClassName } from './styles';
import { ButtonLinkProps } from './type';
import Link from 'next/link';

export function ButtonLink({
  label,
  Icon,
  className,
  variant = 'primary',
  isFullWidth = false,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(className, getButtonClassName({ variant, isFullWidth }))}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </Link>
  );
}
