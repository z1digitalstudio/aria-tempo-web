import clsx from 'clsx';
import { getButtonClassName } from './styles';
import { ButtonLinkProps } from './type';
import Link from 'next/link';

export function ButtonLink({
  label,
  Icon,
  className,
  isFullWidth,
  theme,
  variant,
  outline,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        className,
        getButtonClassName({ isFullWidth, theme, variant, outline }),
      )}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </Link>
  );
}
