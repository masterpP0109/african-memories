"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { accommodations } from "../../data/accommodations";
import { adventures } from "../../data/adventures";
import AdventureCards from "../../components/AdventureCards";

type PageProps = {};

const destinations = [
  {
     slug: "victoria-falls",
    name: "Victoria Falls",
    image: "https://images.pexels.com/photos/21631113/pexels-photo-21631113.jpeg",
    statement: "Witness one of the world's seven natural wonders here today",
    description:
      "Witness the awe-inspiring Victoria Falls, one of the Seven Natural Wonders of the World. Feel the mist on your face as the Zambezi River plunges into a deep gorge, creating a thunderous spectacle of water and light.",
    highlights: [
      "Helicopter rides over the Falls",
      "Bungee jumping at Victoria Falls Bridge",
      "Sunset cruises on the Zambezi River",
      "Guided walks through The Rain Forest",
    ],
  },
  {
     slug: "kariba",
    name: "Kariba",
    image: "https://images.pexels.com/photos/16083420/pexels-photo-16083420.jpeg",
    statement: "Discover a serene lakeside paradise nestled between Zimbabwe and Zambia",
    description:
      "Discover Kariba, a tranquil lakeside paradise nestled between Zimbabwe and Zambia. Home to the world's largest man-made lake and the legendary tiger fish, Kariba offers unforgettable sunsets and serene island escapes.",
    highlights: [
      "Houseboat safaris on Lake Kariba",
      "Tiger fishing adventures",
      "Sunset game cruises",
      "Island camping under the stars",
    ],
  },
  {
     slug: "hwange",
    name: "Hwange",
    image: "https://images.pexels.com/photos/18386171/pexels-photo-18386171.jpeg",
    statement: "Explore Zimbabwe's largest national park with vast savannas and wildlife",
    description:
      "Explore Zimbabwe's largest national park, Hwange, where vast savannas, ancient woodlands, and abundant wildlife converge. Spot elephants, lions, and rare wild dogs in their natural habitat.",
    highlights: [
      "Game drives with expert rangers",
      "Guided walking safaris",
      "Painted Dogs conservation projects",
      "African wild dog pack tracking",
    ],
  },
  {
     slug: "nyanga",
    name: "Nyanga",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/f7/12/a6/aberfoyle-lodge.jpg?w=1200&h=-1&s=1",
    statement: "Escape to Nyanga's lush highlands with cool mountain air today",
    description:
      "Escape to Nyanga's lush highlands and rolling green hills. Zimbabwe's premier mountain destination offers trout fishing, ancient rock art, hiking trails, and cool mountain air.",
    highlights: [
      "Trout fishing in crystal-clear streams",
      "Mount Nyangani hiking trails",
      "Ancient San rock art tours",
      "Waterfalls and trout angling",
    ],
  },
  {
     slug: "masvingo",
    name: "Masvingo",
     image: "https://cdn.britannica.com/15/153415-050-86C6DBCB/Ruins-Great-Zimbabwe.jpg",
    statement: "Step back in time at ancient medieval kingdom stone ruins",
    description:
      "Step back in time at Masvingo, home to the majestic Great Zimbabwe Ruins. A UNESCO World Heritage Site, this ancient city tells the story of a once-great medieval kingdom through its stone ruins and rich history.",
    highlights: [
      "Great Zimbabwe Ruins tours",
      "Ancient stone architecture exploration",
      "Museum of cultural artifacts",
      "Traditional storytelling tours",
    ],
  },
];

const galleryImagesByDestination: Record<string, string[]> = {
  "victoria-falls": [
    "https://www.ilalalodge.com/wp-content/uploads/2017/09/A.jpg",
    "https://wildhorizons.co.za/wp-content/uploads/2026/07/zambezi-royal-sunset-cruise-banner.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1P9YsZswn6Tos_qR-AlyNMrNRmNda_tLWavbe2VWzQw&s=10",
    "https://www.roxannereid.co.za/uploads/3/7/7/8/3778676/roxannereid-img-5830-1-20151206_orig.jpg",
    "https://www.shearwatervictoriafalls.com/wp-content/uploads/2024/04/Jetboat-3-scaled-1.jpg",
    "https://ik.imagekit.io/c0x52ylk1/New%20folder/bungee.jpg",
  ],
  "kariba": [
    "https://www.wonderfulzimbabwe.com/wp-content/uploads/2020/01/Kariba.jpg",
    "https://www.africaendeavours.com/wp-content/uploads/2018/07/CMH-kariba-650x400-bumi-hills-pool-IMG_5634.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/498601080.jpg?k=c3dab72be107629a512429353eaac9031eee05ff088a19c6a6d7405a27c072c1&o=",
    "https://cdn.audleytravel.com/300/214/79/537860-getting-close-to-an-elephant-by-boat-on-lake-kariba-zimbabwe.webp",
    "https://www.visitkariba.com/images/news/kariba-town-collaborating-revive-tourism/0380.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/6f/03/f2/caption.jpg?w=500&h=500&s=1",
  ],
  "hwange": [
    "https://www.expertafrica.com/images/background-image/c95afd25a90d444f8e132e36cfbaa5dd-400-lq.jpg",
    "https://www.andbeyond.com/wp-content/uploads/sites/5/African-Wild-Dogs-playing-in-the-shallow-waters.jpg",
    "https://machabasafaris.com/application/files/thumbnails/image_600x450/7517/5430/0760/machaba-zimbabwe-packages-list-classic-hwange.jpg?fID=9573&d=0&ftid=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtPVG440OqHNva6Q7BtkI_zTUD30xquMeMABZFYoFE5P_2OiJU9dcuSfJ&s=10",
    "https://static.wixstatic.com/media/b2fe2e_6ea1b94e7e824bef9926ab3ff0a33e36~mv2.jpg/v1/fill/w_281,h_264,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/linkwasha-camp-hwange-zimbabwe-timbuktu-travel_JPG.jpg",
    "https://ik.imagekit.io/c0x52ylk1/Dennis/WhatsApp%20Image%202026-08-13%20at%2010.06.13.jpeg?updatedAt=1786610597358",
  ],
  "nyanga": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/f7/12/a6/aberfoyle-lodge.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/ae/8f/54/aberfoyle-lodge.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/af/2b/fa/photo5jpg.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/5f/bc/df/the-cliffs-with-the-zip.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/fa/f2/c2/img-20161227-wa0057-largejpg.jpg?w=1200&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/9c/d1/b4/troutbeck-resort.jpg?w=1200&h=-1&s=1",
  ],
  "masvingo": [
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/27/d2/5a/the-main-enclosure-from.jpg?w=1000&h=-1&s=1",
    "https://cdn.britannica.com/15/153415-050-86C6DBCB/Ruins-Great-Zimbabwe.jpg",
    "https://smarthistory.org/wp-content/uploads/2023/03/Great-zim-aerial-looking-West-copy-scaled.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/cd/29/fd/official-great-zimbabwe.jpg?w=1000&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/d4/7a/99/great-zimbabwe-ruins.jpg?w=1000&h=-1&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/82/7a/87/great-zimbabwe.jpg?w=1200&h=-1&s=1",
  ],
};

const fallbackGalleryImages = [
  "https://images.pexels.com/photos/21631113/pexels-photo-21631113.jpeg",
  "https://images.pexels.com/photos/16083420/pexels-photo-16083420.jpeg",
  "https://images.pexels.com/photos/18386171/pexels-photo-18386171.jpeg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/f7/12/a6/aberfoyle-lodge.jpg?w=1200&h=-1&s=1",
  "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg",
  "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Swimming-Pool-1350x900.jpeg?updatedAt=1778156387582",
  "https://ik.imagekit.io/c0x52ylk1/Safari%20Lodge/victoria-falls-safari-lodge-21.webp?updatedAt=1778529081755",
  "https://ik.imagekit.io/c0x52ylk1/New%20folder/bungee.jpg",
  "https://ik.imagekit.io/c0x52ylk1/New%20folder/helicopter.jpg",
];

const adventuresByDestination: Record<string, typeof adventures> = {
  "victoria-falls": adventures.slice(0, 3),
  "kariba": adventures.filter((a) =>
    ["Houseboat Safari", "Tiger Fishing", "Lake Cruise"].includes(a.title)
  ),
  "hwange": adventures.filter((a) =>
    ["Game Drive", "Walking Safari", "Bird Watching"].includes(a.title)
  ),
  "nyanga": adventures.filter((a) =>
    ["Mountain Hiking", "Trout Fishing", "Rock Art Tour"].includes(a.title)
  ),
  "masvingo": adventures.filter((a) =>
    ["Great Zimbabwe Tour", "Cultural Storytelling", "Ancient Architecture"].includes(a.title)
  ),
};

export default function DestinationPage({}: PageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const params = useParams();
  const slug = params.slug as string;
  const destination = destinations.find((d) => d.slug === slug);

  const galleryImages = galleryImagesByDestination[slug] || fallbackGalleryImages;

  if (!destination) {
    notFound();
  }

  return (
    <main className="relative bg-[#f7ede0] min-h-screen">
      <Navbar />
      <section className="relative h-[78vh] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            {destination.statement}
          </p>
          <button className="mt-6 inline-flex items-center gap-2 border border-white bg-transparent px-8 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:scale-105">
            <MapPin size={18} />
            View Map
          </button>
        </div>
      </section>

      <section className="container mx-auto px-6 pt-16 pb-20 text-center">
        <h2 className="text-3xl font-semibold text-[#3b2b18] mb-6">
          About {destination.name}
        </h2>
        <p className="mx-auto max-w-2xl text-center text-lg text-[#3b2b18]/70 leading-relaxed mb-12">
          {destination.description}
        </p>

        <h3 className="text-2xl font-semibold text-[#3b2b18] mb-4">
          Top Experiences
        </h3>
        <p className="mx-auto max-w-2xl text-[#3b2b18]/70 leading-relaxed mb-12">
          {destination.highlights.join(" • ")}
        </p>

        <h3 className="text-2xl font-semibold text-[#3b2b18] mb-4">
          Where To Stay In {destination.name}
        </h3>
        <div className="mx-auto max-w-2xl space-y-6">
          {accommodations
            .filter((a) => a.location === destination.name)
            .map((accommodation) => (
              <p
                key={accommodation.id}
                className="text-[#3b2b18]/70 leading-relaxed"
              >
                <span className="font-semibold text-[#3b2b18]">
                  {accommodation.title}
                </span>{" "}
                ({accommodation.type}) — {accommodation.description}
              </p>
            ))}
        </div>

        <section className="mt-16">
          <h3 className="text-2xl font-semibold text-[#3b2b18] mb-8 text-center">
            Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
              onClick={(e) => {
                if (e.target === e.currentTarget) setLightboxIndex(null);
              }}
            >
              <button
                className="absolute top-6 right-6 text-white"
                onClick={() => setLightboxIndex(null)}
              >
                ✕
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                onClick={() => setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length)}
              >
                <ChevronLeft size={40} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                onClick={() => setLightboxIndex((lightboxIndex + 1) % galleryImages.length)}
              >
                <ChevronRight size={40} />
              </button>
              <div className="relative max-h-[80vh] max-w-5xl w-full">
                <img
                  src={galleryImages[lightboxIndex]}
                  alt="Gallery preview"
                  className="max-h-[80vh] w-auto mx-auto object-contain"
                />
              </div>
            </div>
          )}
        </section>

        <section className="mt-16">
          <h3 className="text-2xl font-semibold text-[#3b2b18] mb-8 text-center">
            Things To Do In {destination.name}
          </h3>
          <AdventureCards adventures={adventuresByDestination[destination.slug] || []} className="bg-transparent" />
        </section>
      </section>

      <Footer />
    </main>
  );
}