import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { apiGet, Activity } from '../../../lib/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const activity = await apiGet<Activity>(`/activities/${slug}`);
    return {
      title: `${activity.name} - African Memories`,
      description: activity.description || undefined,
    };
  } catch {
    return {
      title: 'Activity Not Found - African Memories',
    };
  }
}

export default async function AdventureDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let activity: Activity | null = null;
  let error: string | null = null;

  try {
    activity = await apiGet<Activity>(`/activities/${slug}`);
  } catch (err) {
    error = (err as Error).message;
  }

  if (error || !activity) {
    notFound();
  }

  const primaryPrice = activity.prices.find((p) => p.isActive) || activity.prices[0];
  const nextSlot = activity.availabilities
    .filter((a) => new Date(a.startsAt) > new Date())
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())[0];

  return (
    <article className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 lg:px-8">
        <Link
          href="/adventures"
          className="inline-flex items-center text-sm text-gray-500 hover:text-orange-600 mb-6"
        >
          &larr; Back to Adventures
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-80 sm:h-96 rounded-lg overflow-hidden">
            {activity.image ? (
              <Image
                src={activity.image}
                alt={activity.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{activity.name}</h1>
            <p className="text-orange-600 font-medium mb-2">{activity.category}</p>
            <p className="text-gray-700 leading-relaxed mb-6">
              {activity.description || 'No description available.'}
            </p>

            {primaryPrice && (
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <span className="font-bold text-xl">
                  {primaryPrice.currency} {parseFloat(primaryPrice.amount).toFixed(2)}
                </span>
              </div>
            )}

            {nextSlot && (
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Next available:</span>{' '}
                  {new Date(nextSlot.startsAt).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  ({nextSlot.remaining} of {nextSlot.capacity} slots left)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
