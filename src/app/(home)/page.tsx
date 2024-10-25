'use client';

import { useState } from 'react';
import { OnboardingCarousel } from './views/onboardingFlow';
import { HomeView } from './views/homeView';

export default function Home() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const handleOnboarding = () => {
    setHasOnboarded(true);
  };

  if (!hasOnboarded) {
    return <OnboardingCarousel autoplay onStart={handleOnboarding} />;
  }

  return <HomeView />;
}
