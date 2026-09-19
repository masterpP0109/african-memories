import { notFound } from 'next/navigation';
import { accommodations } from '../../data/accommodations';
import AccommodationDetail from '../../components/AccommodationDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AccommodationPage({ params }: PageProps) {
  const { slug } = await params;

  if (!accommodations.some(item => item.slug === slug)) notFound();
  return <AccommodationDetail slug={slug} />;
}
