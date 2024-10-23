'use client';

import { WithClassName } from '@/types';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

export function Carousel<T extends ReactNode>({
  items,
  className,
}: WithClassName<{ items: T[] }>) {
  const [active, setActive] = useState(0);

  const go = (n: number) => setActive(n);
  return (
    <div className={className}>
      <p className="text-balance mb-6">{items[active]}</p>
      <nav className="flex gap-2 w-full items-center justify-center">
        {createArrayOfSize(items.length).map((_, i) => (
          <button
            key={i}
            className={clsx(
              'size-[5px] rounded-full bg-black',
              active !== i && 'opacity-20',
            )}
            onClick={() => go(i)}
          ></button>
        ))}
      </nav>
    </div>
  );
}

function createArrayOfSize(n: number) {
  return new Array(n).fill(undefined);
}
