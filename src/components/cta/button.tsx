import clsx from 'clsx';
import { ButtonProps } from './type';
import { getButtonClassName } from './styles';

export function Button({
  label,
  Icon,
  className,
  isFullWidth,
  theme,
  variant,
  outline,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        className,
        getButtonClassName({ isFullWidth, theme, variant, outline }),
      )}
      {...props}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
}
