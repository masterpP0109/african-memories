'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Places from '../components/Places';
import SafariCards from '../components/SafariCards';
import Footer from '../components/Footer';
import Image from 'next/image';

const heroSlides = [
  {
    image: "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Entrance-Staircase-PRH-1351x900.jpeg?updatedAt=1778156388218",
    alt: "Places to Stay",
  },
  {
    image: "https://ik.imagekit.io/c0x52ylk1/Pioneer%20Lodge/pioneers_06_low-1-1500x630.jpg?updatedAt=1778529644584",
    alt: "Pioneer Lodge",
  },
];

export default function PlacesToStay() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Carousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Sliding Images */}
        <div
          className="flex h-full transition-transform duration-1000 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
            </div>
          ))}
        </div>

        {/* Fixed Overlay Text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center">
          <div className="container mx-auto px-6 lg:px-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl mx-auto">
              Places to Stay
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Discover handpicked luxury lodges and retreats across Africa&apos;s most breathtaking destinations.
            </p>
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <SafariCards heading="Explore Toprated Hotels & Lodges" />

      <Footer />
    </div>
  );
}