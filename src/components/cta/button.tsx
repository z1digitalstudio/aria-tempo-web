import clsx from 'clsx';
import { ButtonProps } from './type';
import { getButtonClassName } from './styles';

export function Button({
  label,
  Icon,
  className,
  variant = 'primary',
  isFullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(className, getButtonClassName({ variant, isFullWidth }))}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
}
