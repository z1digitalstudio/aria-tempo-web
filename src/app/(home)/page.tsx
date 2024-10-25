import { OnboardingCarousel } from './views/onboardingFlow';
import HomeView from './views/homeView';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ onboarded: string }>;
}) {
  const onboarded = (await searchParams)['onboarded'];

  if (!onboarded) {
    return <OnboardingCarousel autoplay />;
  }

  return <HomeView />;
}
