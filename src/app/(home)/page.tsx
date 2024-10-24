import Logo from '@/assets/brand/w-hotels.svg';
import LobbyIcon from '@/assets/icons/lobby.svg';
import PoolIcon from '@/assets/icons/pool.svg';
import MenuIcon from '@/assets/icons/menu.svg';
import WeatherIcon from '@/assets/icons/weather.svg';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Button } from '@/components/cta/button';

const ZONES = [
  { label: 'Lobby', icon: LobbyIcon },
  { label: 'Pool', icon: PoolIcon },
];

const formatCurrentTime = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(Date.now()));
};

export default function Home() {
  return (
    <main className="size-full h-svh overflow-hidden text-white bg-black relative">
      <div className="opacity-70 absolute inset-0 bg-whotels-splash bg-[length:240%] bg-[left_top_30%] bg-no-repeat lg:bg-cover lg:bg-[left_top_30%]" />
      <div className="z-10 relative flex flex-col h-full">
        <header className="flex justify-between items-center py-6 px-4 border-b-white border-b border-opacity-20">
          <div className="flex items-center">
            <Logo />
            <p className="mt-[0.1rem] font-helios uppercase text-sm/6 before:border-l before:pr-2 before:ml-2">
              Tempo
            </p>
          </div>
          <ButtonIcon Icon={MenuIcon} label="Open menu" />
        </header>
        <section className="flex-1 border-b-white border-b border-opacity-20">
          <div className="pt-8 pb-8 px-4 flex flex-col h-full">
            <div className="flex justify-between items-baseline mb-auto">
              <p className="type-label-1">
                {formatCurrentTime({ weekday: 'long', hour: 'numeric' })}
              </p>
              <p className="type-label-1 flex gap-1 items-center">
                68º <WeatherIcon />
              </p>
            </div>
            <h1 className="type-headline-4 text-balance max-w-[11rem]  mb-auto">
              Welcome to West Hollywood
            </h1>
          </div>
        </section>
        <footer className="pt-6 pb-8 px-4 ">
          <p className="type-label-1 mb-4">Select your listening experience</p>
          <div className="w-full flex gap-3 flex-wrap">
            {ZONES.map((zone) => {
              return (
                <Button
                  key={zone.label}
                  Icon={zone.icon}
                  label={zone.label}
                  className="flex flex-col flex-1 py-6"
                />
              );
            })}
            <Button label="Listen on my phone" isFullWidth />
          </div>
        </footer>
      </div>
    </main>
  );
}
