import { ButtonLink } from '@/components/cta/link';
import { Header } from '@/components/header';
import { links } from '@/utils/links';
import { Grid } from './components/grid';

export default function Explore() {
  return (
    <div className="relative bg-black text-creme size-full h-svh flex flex-col">
      <Header />
      <main className="size-full flex-1 flex flex-col minv-h-0">
        <div className="relative flex-1 overflow-hidden explore-bg-overlay">
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
