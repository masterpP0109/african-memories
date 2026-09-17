"use client";

import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

interface Adventure {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  slug: string;
}

interface AdventureCardsProps {
  adventures: Adventure[] | null;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

export default function AdventureCards({ adventures, className, loading = false, error = null }: AdventureCardsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) {
    return (
      <section className={`bg-white py-16 md:py-20 lg:py-24 ${className || ''}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative h-72 md:h-80 lg:h-96 overflow-hidden group bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`bg-white py-16 md:py-20 lg:py-24 ${className || ''}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-center text-red-600">Failed to load adventures. Please try again later.</p>
        </div>
      </section>
    );
  }

  if (!adventures || adventures.length === 0) {
    return (
      <section className={`bg-white py-16 md:py-20 lg:py-24 ${className || ''}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <p className="text-center text-gray-500">No adventures available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-white py-16 md:py-20 lg:py-24 ${className || ''}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {adventures.map((adventure) => (
            <Link
              key={adventure.id}
              href={`/adventures/${adventure.slug}`}
              className="group block focus-visible:outline-none focus-visible:ring-2"
            >
              <div
                className="relative h-72 md:h-80 lg:h-96 overflow-hidden group cursor-pointer"
                onMouseEnter={() => setHoveredId(adventure.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${adventure.image || '/placeholder.jpg'}')`,
                  }}
                />

                {/* Overlay */}
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundColor:
                      hoveredId === adventure.id
                        ? "rgba(225, 119, 45, 0.45)"
                        : "rgba(0, 0, 0, 0.4)",
                  }}
                />

                {/* Text Readability Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:mb-3 transition-all duration-300">
                      {adventure.title}
                    </h3>
                    <p
                      className={`text-white text-sm md:text-base leading-relaxed transition-all duration-300 overflow-hidden ${
                        hoveredId === adventure.id
                          ? "max-h-40 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {adventure.description}
                    </p>
                  </div>
                  <div
                    className={`transition-all duration-300 mt-3 self-end ${
                      hoveredId === adventure.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-2"
                    }`}
                  >
                    <FaArrowRight className="text-white text-xl" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
