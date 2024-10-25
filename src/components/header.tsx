import Logo from '@/assets/brand/w-hotels.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import { ButtonIcon } from './buttonIcon';
import clsx from 'clsx';

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={clsx(
        className,
        'flex justify-between items-center text-creme py-6 px-4 border-b-white border-b border-opacity-20',
      )}
    >
      <div className="flex items-center">
        <Logo />
        <p className="mt-[0.1rem] font-helios uppercase text-sm/6 before:border-l before:pr-2 before:ml-2">
          Tempo
        </p>
      </div>
      <ButtonIcon Icon={MenuIcon} label="Open menu" />
    </header>
  );
};
