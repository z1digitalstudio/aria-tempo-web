'use client';

import SpotifyIcon from '@/assets/icons/spotify.svg';
import { links } from '@/utils/links';
import { Button } from '@/components/cta/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SyncExperience from './views/syncFlow';
import { Video } from '@/components/video';

export default function Sync() {
  const { push } = useRouter();

  const [syncState, setSyncState] = useState<
    'not-synced' | 'syncing' | 'synced' | 'skipped'
  >('not-synced');

  const handleSyncSpotify = () => {
    setSyncState('syncing');
  };

  const handleSkipSyncing = () => {
    push(links.home);
  };

  const handleSpotifySyncEnd = () => {
    push(links.explore);
  };

  if (syncState === 'syncing') {
    return <SyncExperience onSyncEnd={handleSpotifySyncEnd} />;
  }

  return (
    <main className="h-svh">
      <div className="flex flex-col items-start size-full min-h-0">
        {/** Get video with complete circles and, if possible, transparent bg to accomodate to larger screens */}
        <div className="max-lg:aspect-square w-full min-h-0 flex items-center justify-center bg-[#09090a] flex-1 overflow-hidden">
          <Video
            className="size-full object-cover max-w-2xl"
            src="/whotels/video/start-sync-experience.mp4"
          />
        </div>
        <section className="w-full bg-creme mt-auto text-black items-center pt-10 pb-4 px-4 text-xl/6 text-center content-between flex flex-col">
          <div className="flex flex-col gap-6 mb-6">
            <h1 className="type-headline-4">Connect to your Spotify</h1>
            <p className="text-balance mb-3 type-body-2 opacity-50">
              Link your Spotify profile to get more personalized experience plus
              your music profile.
            </p>
          </div>

          <div className="flex gap-2 flex-col mt-auto w-full">
            <Button
              Icon={SpotifyIcon}
              label="Connect to Spotify"
              isFullWidth
              onClick={handleSyncSpotify}
            />
            <Button
              label="Connect later"
              variant="secondary"
              outline={false}
              isFullWidth
              onClick={handleSkipSyncing}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
