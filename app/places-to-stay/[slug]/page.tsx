import AccommodationDetail from '../../components/AccommodationDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AccommodationPage({ params }: PageProps) {
  const { slug } = await params;

  return <AccommodationDetail slug={slug} />;
}
