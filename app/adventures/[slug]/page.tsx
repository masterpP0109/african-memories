import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { cache } from 'react';
import { apiGet, ApiError, Activity } from '../../../lib/api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface PageProps { params: Promise<{ slug: string }> }
const getActivity = cache(async (slug: string) => {
  try { return await apiGet<Activity>(`/activities/${encodeURIComponent(slug)}`); }
  catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
});
export async function generateMetadata({ params }: PageProps) {
  const activity = await getActivity((await params).slug);
  return { title: `${activity.name} - African Memories`, description: activity.description || undefined };
}
export default async function AdventureDetailPage({ params }: PageProps) {
  const activity = await getActivity((await params).slug);
  const now = Date.now();
  const price = activity.prices.filter(p => p.isActive && Date.parse(p.validFrom) <= now && Date.parse(p.validTo) >= now)
    .sort((a, b) => Date.parse(b.validFrom) - Date.parse(a.validFrom))[0];
  const slots = activity.availabilities.filter(a => Date.parse(a.startsAt) > now && a.remaining > 0)
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt)).slice(0, 4);
  return <main className="min-h-screen bg-[#f8efe6] text-[#3b2b18]">
    <Navbar />
    <section className="relative flex min-h-[520px] h-[70svh] items-end bg-[#3b2b18]">
      {activity.image && <Image src={activity.image} alt={activity.name} fill priority sizes="100vw" className="object-cover" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 pt-40 lg:px-8">
        <Link href="/adventures" className="text-sm text-white/90 hover:underline">&larr; All adventures</Link>
        <p className="mt-8 text-sm uppercase tracking-[0.25em] text-orange-200">{activity.category}</p>
        <h1 className="mt-4 max-w-4xl text-4xl text-white sm:text-6xl lg:text-7xl">{activity.name}</h1>
      </div>
    </section>
    <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-24">
      <article>
        <p className="text-sm uppercase tracking-[0.25em] text-orange-700">Your next African memory</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">Experience {activity.name}</h2>
        <p className="mt-8 whitespace-pre-line text-lg leading-8 text-[#5D4A37]">{activity.description || 'Contact our team for the full details of this experience.'}</p>
        <Link href="/adventures" className="mt-10 inline-block border-b border-[#3b2b18] pb-1">Explore more adventures &rarr;</Link>
      </article>
      <aside className="self-start border border-[#3b2b18]/15 bg-white p-6 sm:p-8 lg:sticky lg:top-28">
        <h2 className="text-2xl">Plan your experience</h2>
        {price ? <p className="mt-6 text-3xl">{price.currency} {Number(price.amount).toFixed(2)}</p> : <p className="mt-6 text-lg">Contact us for current pricing</p>}
        <div className="my-6 border-t border-[#3b2b18]/15 pt-6">
          <h3 className="text-xl">Upcoming availability</h3>
          {slots.length ? <ul className="mt-4 space-y-4">{slots.map(slot => <li key={slot.id} className="text-sm leading-6">
            <time dateTime={slot.startsAt}>{new Date(slot.startsAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Africa/Harare' })}</time>
            <span className="block text-[#5D4A37]">{slot.remaining} spaces available ? Zimbabwe time (UTC+2)</span>
          </li>)}</ul> : <p className="mt-4 text-sm leading-6 text-[#5D4A37]">Contact our team to discuss dates and availability.</p>}
        </div>
        <a href={`mailto:res@africanmemories.com?subject=${encodeURIComponent(`Enquiry: ${activity.name}`)}`} className="block bg-[#3b2b18] px-6 py-4 text-center font-semibold text-white transition hover:bg-orange-700">Enquire about this adventure &rarr;</a>
        <p className="mt-4 text-sm leading-6 text-[#5D4A37]">Our team will confirm your dates and final quote by email.</p>
      </aside>
    </div>
    <Footer />
  </main>;
}
