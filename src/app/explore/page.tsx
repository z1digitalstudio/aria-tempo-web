import { ExploreView } from './view';

export default async function Explore({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ showResult: string }>;
}>) {
  const showResult = (await searchParams)['showResult'];

  return <ExploreView showResult={showResult} />;
}
