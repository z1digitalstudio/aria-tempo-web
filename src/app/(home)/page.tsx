import GetStartedView from './views/getStartedView';
import HomeView from './views/homeView';

export default async function Home({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ onboarded: string }>;
}>) {
  const onboarded = (await searchParams)['onboarded'];

  if (!onboarded) {
    return <GetStartedView />;
  }

  return <HomeView />;
}
