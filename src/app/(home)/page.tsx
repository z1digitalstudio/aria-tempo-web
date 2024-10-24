'use client';

import LobbyIcon from '@/assets/icons/lobby.svg';
import PoolIcon from '@/assets/icons/pool.svg';
import WeatherIcon from '@/assets/icons/weather.svg';
import { Button } from '@/components/cta/button';
import { useState } from 'react';
import { OnboardingCarousel } from './components/OnboardingCarousel';

const ZONES = [
  { label: 'Lobby', icon: LobbyIcon },
  { label: 'Pool', icon: PoolIcon },
];

const formatCurrentTime = (options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(Date.now()));
};

export default function Home() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const handleOnboarding = () => setHasOnboarded(true);

  if (!hasOnboarded) {
    return <OnboardingCarousel autoplay onStart={handleOnboarding} />;
  }

  return (
    <main className="relative flex flex-col h-full">
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
    </main>
  );
}
