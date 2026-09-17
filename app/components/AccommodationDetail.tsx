'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { accommodations as accommodationCatalog } from '../data/accommodations';
import Navbar from './Navbar';
import AccommodationFacilitiesSection from './AccommodationFacilities';
import AccommodationMainTitlesSection from './AccommodationMainTitles';

export default function AccommodationDetail({ slug }: { slug: string }) {
  const accommodation = accommodationCatalog.find((item) => item.slug === slug);

  if (!accommodation) {
    return (
      <main className="min-h-screen bg-[#f8efe6] px-6 py-20 text-center">
        <h1 className="text-3xl font-semibold text-stone-800">Accommodation not found</h1>
        <p className="mt-4 text-stone-600">The selected hotel could not be found.</p>
        <Link href="/places-to-stay" className="mt-8 inline-flex items-center gap-2 text-orange-600 hover:underline">
          Back to places to stay
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-stone-800">
      <Navbar />

      <section className="relative h-screen w-full overflow-hidden">
        <Image
          src={accommodation.image}
          alt={accommodation.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="w-full max-w-4xl text-center">
            <h1 className="text-4xl font-semibold text-white sm:text-5xl lg:text-7xl">
              {accommodation.title}
            </h1>
          </div>
        </div>
      </section>

      <AccommodationDetailFeature accommodation={accommodation} />
      <AccommodationImageCarousel accommodation={accommodation} />
      <AccommodationFacilitiesSection accommodation={accommodation} />
      <div className="bg-[#f8efe6] py-6">
        <div className="mx-auto h-px w-[94%] bg-[#3b2b18] opacity-70" />
      </div>
      <AccommodationMainTitlesSection accommodation={accommodation} />

      <section className="bg-[#f8efe6] py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-center">
            <Image
              src={accommodation.foodImage ?? accommodation.image}
              alt="Dining at accommodation"
              width={1350}
              height={900}
              className="w-[86.4vw] max-w-none object-cover"
            />
          </div>
        </div>
      </section>

    </main>
  );
}

function AccommodationDetailFeature({ accommodation }: { accommodation: (typeof accommodationCatalog)[0] }) {
  return (
    <section className="bg-[#f8efe6] text-stone-800 py-[150px]">
      <div className="container mx-auto px-6 py-0 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold leading-tight text-[#3b2b18] sm:text-5xl">
              Explore {accommodation.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#3b2b18]">
              {accommodation.description}
            </p>
            <p className="mt-4 text-lg leading-8 text-[#3b2b18]">
              Settle into spacious rooms with bespoke finishes, enjoy curated dining options, and unwind by the pool or riverside terrace. This property blends refined comfort with locally inspired experiences for a memorable stay.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#3b2b18]">
              Ideal for travelers seeking seamless service, cultural excursions, and calm retreat spaces, the lodge makes it easy to relax after a day exploring the region.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/places-to-stay"
                className="inline-flex items-center justify-center border border-[#3b2b18] bg-[#3b2b18] px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-[#2a1f15]"
              >
                Book now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#3b2b18] bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#3b2b18] transition hover:bg-[#f4ede6] hover:text-[#3b2b18]"
              >
                Enquire
              </Link>
            </div>
          </div>

          <div className="overflow-hidden bg-white shadow-2xl ring-1 ring-black/5 h-full">
            <Image
              src={accommodation.image}
              alt={accommodation.title}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function AccommodationImageCarousel({ accommodation }: { accommodation: (typeof accommodationCatalog)[0] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [startX, setStartX] = useState(0);
  const [savedScrollLeft, setSavedScrollLeft] = useState(0);
  const [pointerId, setPointerId] = useState<number | null>(null);

  const carouselImages = [
    { src: accommodation.image, alt: `${accommodation.title} overview`, minWidth: 540 },
    { src: accommodationCatalog.find((item) => item.id !== accommodation.id)?.image ?? accommodation.image, alt: 'Lounge view', minWidth: 420 },
    { src: accommodationCatalog.find((item) => item.id !== accommodation.id && item.image !== accommodation.image)?.image ?? accommodation.image, alt: 'Pool scene', minWidth: 480 },
    { src: accommodationCatalog.find((item) => item.id !== accommodation.id && item.image !== accommodation.image && item.id !== accommodation.id + 1)?.image ?? accommodation.image, alt: 'Dining view', minWidth: 520 },
  ];

  const handlePointerEnter = () => {
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      setIsHovering(false);
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!carouselRef.current) return;
    setIsDragging(true);
    setPointerId(event.pointerId);
    setStartX(event.clientX);
    setSavedScrollLeft(carouselRef.current.scrollLeft);
    setIsHovering(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setCursorPos({ x: event.clientX, y: event.clientY });

    if (isDragging && event.pointerId === pointerId) {
      const walk = event.clientX - startX;
      carouselRef.current.scrollLeft = savedScrollLeft - walk;
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setPointerId(null);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section className="bg-[#f8efe6] text-[#3b2b18] w-full pt-5">
      <div className="w-full overflow-hidden pb-16">
        <div
          ref={carouselRef}
          className="relative flex gap-6 overflow-x-scroll overflow-y-hidden pb-6 pr-6 scroll-smooth w-screen no-scrollbar cursor-none select-none"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          style={{ cursor: 'none', WebkitOverflowScrolling: 'touch', minHeight: '460px' }}
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="snap-start flex-shrink-0 overflow-hidden bg-white shadow-2xl ring-1 ring-black/5"
              style={{ minWidth: `${image.minWidth}px`, height: '470px' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                draggable={false}
                onDragStart={(event) => event.preventDefault()}
              />
            </div>
          ))}

          <div
            className="fixed z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[#3b2b18] text-[10px] uppercase tracking-[0.35em] text-white shadow-lg transition-transform duration-200 pointer-events-none"
            style={{
              display: isHovering || isDragging ? 'flex' : 'none',
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            drag
          </div>
        </div>
      </div>
    </section>
  );
}
