import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { createArrayOfSize } from '@/utils/array';
import { links } from '@/utils/links';

const grid: number[][] = createArrayOfSize(5, [0, 1, 2, 3, 4, 5]);

export default function MusicProfile() {
  return (
    <div className="relative bg-black text-creme size-full h-svh flex flex-col">
      <Header />
      <main className="size-full flex-1 flex flex-col min-h-0">
        <div className="overflow-hidden">
          <Grid />
        </div>
        <footer className="border-t border-white border-opacity-20 py-6 px-4">
          <ButtonLink
            href={links.home}
            label="Start listening"
            variant="secondary"
            theme="dark"
          />
        </footer>
      </main>
    </div>
  );
}

export const icon = {
  margin: 20,
  size: 100,
};

function Grid() {
  return (
    <div className="relative w-[1000px] h-[1000px] top-0 left-[-225px]">
      {grid.map((rows, rowIndex) =>
        rows.map((colIndex) => (
          <Item key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} />
        )),
      )}
    </div>
  );
}

function Item({ row, col }: { row: number; col: number }) {
  const xOffset =
    col * (icon.size + icon.margin) +
    (row % 2) * ((icon.size + icon.margin) / 2);
  const yOffset = row * icon.size;

  // to do this in tailwind i need to be able to gen classnames on runtime for this values
  return (
    <div
      style={{
        top: yOffset,
        left: xOffset,
        width: icon.size,
        height: icon.size,
      }}
      className="absolute bg-creme rounded-full"
    ></div>
  );
}
