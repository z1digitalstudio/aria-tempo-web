import { ZoneView } from './view/zone';

// Todo: where this data is coming from?
export type Zone = { label: string };
const ZONES: { [zone: string]: Zone } = {
  lobby: { label: 'Lobby' },
  pool: { label: 'Pool' },
};

export default async function Zone({
  params,
}: Readonly<{ params: Promise<{ zone: string }> }>) {
  const zoneSlug = (await params).zone;
  const zone = ZONES[zoneSlug];
  return <ZoneView zone={zone} />;
}
