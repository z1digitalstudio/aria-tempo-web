import { WithClassName } from '@/types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { InputHTMLAttributes } from 'react';

type InputRangeProps = WithClassName<
  {
    label: string;
    max?: number;
    min?: number;
    steps?: { label: string; value: number }[];
  } & InputHTMLAttributes<HTMLInputElement>
>;

export const InputRange = ({
  label,
  className,
  value,
  onChange,
  max = 100,
  min = 0,
  id,
  steps,
}: InputRangeProps) => {
  const progress = typeof value === 'number' ? (value / max) * 100 : 0;
  return (
    <div className={clsx(className, 'type-label-1 text-creme')}>
      <label className="block mb-4" htmlFor={id}>
        {label}
      </label>
      <motion.input
        id={id}
        type="range"
        max={max}
        min={min}
        list="values"
        className="w-full"
        value={value}
        onChange={onChange}
        style={{
          background: `linear-gradient(to right, var(--color-creme) ${progress}%, rgba(var(--rgb-color-creme), 0.3) ${progress}%)`,
        }}
      />
      {steps?.length && (
        <datalist id={`${id}-steps`} className="w-full relative flex py-6">
          {steps.map(({ value, label }) => (
            <motion.option
              value={value}
              label={label}
              key={`${value}-${label}`}
              style={{ left: `${value}%`, translateX: value ? '-100%' : 0 }}
              className="absolute type-label-2"
            ></motion.option>
          ))}
        </datalist>
      )}
    </div>
  );
};
