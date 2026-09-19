"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface HomeActivity { id: string; slug: string; name: string; location: string; image: string; alt: string; carImage: string; description: string; }

export default function Activities({ activities = [] }: { activities?: HomeActivity[] }) {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  


  return (
    <section className="bg-white py-14 sm:py-20 text-[#3b2b18]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
              THINGS TO DO 
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#3b2b18] sm:text-5xl">
              Unforgettable Safari Experiences
            </h2>
          </div>
          <div className="flex gap-3">
            <Link
              href="/adventures"
              className="flex items-center gap-2 text-[#3b2b18] transition-all duration-300 bg-gradient-to-r from-[#3b2b18] to-[#3b2b18] bg-no-repeat bg-left-bottom bg-[length:0_2px] hover:bg-[length:100%_2px]"
            >
              View All →
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {activities.map((activity) => {
            const isFlipped = flippedId === activity.id;
            return (
              <div
                key={activity.id}
                className="w-full max-w-[372px] perspective-1000 cursor-pointer"
                onClick={() => setFlippedId(isFlipped ? null : activity.id)}
              >
                <div className="relative aspect-[4/5] transition-transform duration-700 preserve-3d" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 backface-hidden overflow-hidden shadow-lg">
                    <img
                      src={activity.image}
                      alt={activity.alt}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 backface-hidden rotate-y-180 overflow-hidden shadow-lg">
                    <img
                      src={activity.carImage}
                      alt={`${activity.name} vehicle`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-xl font-bold text-white">{activity.name}</h3>
                      <p className="text-sm text-gray-200">{activity.location}</p>
                      <p className="mt-2 text-sm text-gray-300">{activity.description}</p>
                    <Link
                      href={`/adventures/${activity.slug}`}
                      className="mt-3 inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors"
                    >
                        Discover →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="pt-5 text-center">
                  <h3 className="text-2xl font-semibold text-[#3b2b18]">{activity.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
