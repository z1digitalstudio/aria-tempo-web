import clsx from 'clsx';
import { ButtonProps } from './type';
import { getButtonClassName } from './styles';

export function Button({ label, Icon, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(className, getButtonClassName(props))} {...props}>
      {Icon && <Icon />}
      {label}
    </button>
  );
}
