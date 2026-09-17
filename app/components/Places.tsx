"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const lodgeOneImages = [
  "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Entrance-Staircase-PRH-1351x900.jpeg?updatedAt=1778156388218",
  "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Swimming-Pool-1350x900.jpeg?updatedAt=1778156387582",
  "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Bathroom-Deluxe-Suite-PRH-1350x900.jpg?updatedAt=1778156386768",
];

const lodgeTwoImages = [
  "https://ik.imagekit.io/c0x52ylk1/Pioneer%20Lodge/A749794-HDRPionnersPA.jpeg?updatedAt=1778529648797",
  "https://ik.imagekit.io/c0x52ylk1/Pioneer%20Lodge/A748675-Pioneers.jpeg?updatedAt=1778529647402",
  "https://ik.imagekit.io/c0x52ylk1/Pioneer%20Lodge/pioneers_06_low-1-1500x630.jpg?updatedAt=1778529644584",
];

const lodgeThreeImages = [
  "https://ik.imagekit.io/c0x52ylk1/Safari%20Lodge/victoria-falls-safari-lodge-21.webp?updatedAt=1778529081755",
  "https://ik.imagekit.io/c0x52ylk1/Safari%20Lodge/victoria-falls-safari-suits-lounge-and-kitchenette.webp?updatedAt=1778529082017",
  "https://ik.imagekit.io/c0x52ylk1/Safari%20Lodge/victoria-falls-safari-lodge-17.webp?updatedAt=1778529082207",
];

function LodgeCarousel({
  images,
  currentImageIndex,
  onPrevious,
  onNext,
  onIndicatorClick,
  imageRight,
  cardSide,
  cardContent,
}: {
  images: string[];
  currentImageIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onIndicatorClick: (index: number) => void;
  imageRight: boolean;
  cardSide: string;
  cardContent: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Image Carousel */}
      <div
        className={
          "relative h-[350px] md:h-[420px] lg:h-[500px] w-full lg:w-[78%] overflow-hidden" +
          (imageRight ? " lg:ml-auto" : "")
        }
      >
        <div>
          <img
            src={images[currentImageIndex]}
            alt={"Luxury Safari Lodge " + (currentImageIndex + 1)}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>

        {/* Left Arrow */}
        <button
          onClick={onPrevious}
          className="absolute bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft size={20} className="text-[#3b2b18]" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={onNext}
          className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-105"
        >
          <ArrowRight size={20} className="text-[#3b2b18]" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map(function (_, idx) {
            const active = idx === currentImageIndex;
            const dotClass = active
              ? "h-2 w-6 rounded-full bg-white transition-all duration-300"
              : "h-2 w-2 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/75";
            return (
              <button
                key={idx}
                onClick={function () {
                  onIndicatorClick(idx);
                }}
                className={dotClass}
                aria-label={"Go to image " + (idx + 1)}
              />
            );
          })}
        </div>
      </div>

      {/* Card */}
      {cardContent}
    </div>
  );
}

export default function Places() {
  const [currentImageIndex1, setCurrentImageIndex1] = useState(1);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [currentImageIndex3, setCurrentImageIndex3] = useState(0);

  useEffect(function () {
    if (typeof window === "undefined") return;
    const timer = setInterval(function () {
      setCurrentImageIndex1(function (prev) {
        return (prev + 1) % lodgeOneImages.length;
      });
    }, 4000);
    return function () {
      clearInterval(timer);
    };
  }, []);

  function goToPrevious1() {
    setCurrentImageIndex1(function (prev) {
      if (prev === 0) {
        return lodgeOneImages.length - 1;
      }
      return prev - 1;
    });
  }

  function goToNext1() {
    setCurrentImageIndex1(function (prev) {
      return (prev + 1) % lodgeOneImages.length;
    });
  }

  function goToPrevious2() {
    setCurrentImageIndex2(function (prev) {
      if (prev === 0) {
        return lodgeTwoImages.length - 1;
      }
      return prev - 1;
    });
  }

  function goToNext2() {
    setCurrentImageIndex2(function (prev) {
      return (prev + 1) % lodgeTwoImages.length;
    });
  }

  function goToPrevious3() {
    setCurrentImageIndex3(function (prev) {
      if (prev === 0) {
        return lodgeThreeImages.length - 1;
      }
      return prev - 1;
    });
  }

  function goToNext3() {
    setCurrentImageIndex3(function (prev) {
      return (prev + 1) % lodgeThreeImages.length;
    });
  }

  const card1Right = (
    <>
      {/* Floating White Card */}
      <div className="absolute top-6 left-[calc(78%-50px)] z-10 hidden w-[354px] bg-white p-8 shadow-2xl lg:block">
        <h3 className="mb-6 font-serif text-3xl font-medium text-[#3b2b18]">
          Palm River Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
          The Palm River Hotel offers a tranquil retreat near Victoria Falls with a full breakfast and daily managers reception. Guests enjoy the outdoor pool, spa services like manicures and massages, and free WiFi to stay connected throughout their stay.
        </p>

        <Link
          href="/places-to-stay/palm-river-lodge"
          className="group mt-8 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* Mobile Card */}
      <div className="bg-white p-6 shadow-xl lg:hidden">
        <h3 className="mb-4 font-serif text-2xl font-medium text-[#3b2b18]">
          Palm River Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
           The Palm River Hotel offers a tranquil retreat near Victoria Falls with a full breakfast and daily managers reception. Guests enjoy the outdoor pool, spa services like manicures and massages, and free WiFi to stay connected throughout their stay.
        </p>

        <Link
          href="/places-to-stay/palm-river-lodge"
          className="group mt-6 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </>
  );

  const card2Left = (
    <>
      {/* Floating White Card - opposite side */}
      <div className="absolute top-6 right-[calc(78%-50px)] z-10 hidden w-[354px] bg-white p-8 shadow-2xl lg:block">
        <h3 className="mb-6 font-serif text-3xl font-medium text-[#3b2b18]">
          Victoria Falls Pioneer Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
          Pioneers Lodge offers a peaceful escape with a serene setting. Guests enjoy continental breakfast, then relax in the garden or spa. Two outdoor pools provide relaxation, and free WiFi keeps everyone connected. The 24/7 front desk team ensures a smooth stay.
        </p>

        <Link
          href="/places-to-stay/victoria-falls-pioneer-camp"
          className="group mt-8 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* Mobile Card */}
      <div className="bg-white p-6 shadow-xl lg:hidden">
        <h3 className="mb-4 font-serif text-2xl font-medium text-[#3b2b18]">
          Victoria Falls Pioneer Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
          Pioneers Lodge offers a peaceful escape with a serene setting. Guests enjoy continental breakfast, then relax in the garden or spa. Two outdoor pools provide relaxation, and free WiFi keeps everyone connected. The 24/7 front desk team ensures a smooth stay.
        </p>

        <Link
          href="/places-to-stay/victoria-falls-pioneer-camp"
          className="group mt-6 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </>
  );

  const card3Right = (
    <>
      {/* Floating White Card */}
      <div className="absolute top-6 left-[calc(78%-50px)] z-10 hidden w-[354px] bg-white p-8 shadow-2xl lg:block">
        <h3 className="mb-6 font-serif text-3xl font-medium text-[#3b2b18]">
          Victoria Falls Safari Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
       Located in Victoria Falls, within 3.1 mi of the Victoria Falls Bridge, Victoria Falls Safari Lodge offers 4-star accommodations with a garden, a terrace and a bar. 

        </p>

        <Link
          href="/places-to-stay/victoria-falls-safari-lodge"
          className="group mt-8 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>

      {/* Mobile Card */}
      <div className="bg-white p-6 shadow-xl lg:hidden">
        <h3 className="mb-4 font-serif text-2xl font-medium text-[#3b2b18]">
          Victoria Falls Safari Lodge
        </h3>

        <p className="text-sm leading-7 text-[#3b2b18]">
          Located in Victoria Falls, within 3.1 mi of the Victoria Falls Bridge, Victoria Falls Safari Lodge offers 4-star accommodations with a garden, a terrace and a bar. The property is close to Elephant&apos;s Walk Shopping &amp; Artist Village, Swimming hole and Victoria Falls Safari Spa. The restaurant serves international cuisine.
        </p>

        <Link
          href="/places-to-stay/victoria-falls-safari-lodge"
          className="group mt-6 inline-flex items-center gap-3 uppercase tracking-[0.3em] text-sm text-[#3b2b18]"
        >
          Discover
          <span className="transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </Link>
      </div>
    </>
  );

  return (
    <section className="bg-[#f7ede0] py-14 sm:py-20 text-[#3b2b18]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Places to Stay
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-[#3b2b18] sm:text-5xl">
              Explore Top-Rated Hotels & Lodges
            </h2>
          </div>

          <Link
            href="/places-to-stay"
            className="flex items-center gap-2 text-[#3b2b18] transition-all duration-300 bg-gradient-to-r from-[#3b2b18] to-[#3b2b18] bg-no-repeat bg-left-bottom bg-[length:0_2px] hover:bg-[length:100%_2px]"
          >
            View All →
          </Link>
        </div>

        {/* Featured Lodge - Card on Right */}
        <div className="relative mb-20">
          <LodgeCarousel
            images={lodgeOneImages}
            currentImageIndex={currentImageIndex1}
            onPrevious={goToPrevious1}
            onNext={goToNext1}
            onIndicatorClick={setCurrentImageIndex1}
            cardSide="right"
            cardContent={card1Right}
            imageRight={false}
          />
        </div>

        {/* Second Lodge - Card on Left (Opposite Side) */}
        <div className="relative mb-20">
          <LodgeCarousel
            images={lodgeTwoImages}
            currentImageIndex={currentImageIndex2}
            onPrevious={goToPrevious2}
            onNext={goToNext2}
            onIndicatorClick={setCurrentImageIndex2}
            cardSide="left"
            cardContent={card2Left}
            imageRight={true}
          />
        </div>

        {/* Third Lodge - Copy of Section 1 */}
        <div className="relative">
          <LodgeCarousel
            images={lodgeThreeImages}
            currentImageIndex={currentImageIndex3}
            onPrevious={goToPrevious3}
            onNext={goToNext3}
            onIndicatorClick={setCurrentImageIndex3}
            cardSide="right"
            cardContent={card3Right}
            imageRight={false}
          />
        </div>
      </div>
    </section>
  );
}
