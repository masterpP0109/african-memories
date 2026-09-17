"use client"
import React, { useRef } from 'react';
import Image from 'next/image';
import { imagekitUrl } from '../../lib/imagekit';
import { ArrowRight, ArrowLeft, Wifi, Utensils, Martini, Waves, Coffee, HeartPulse } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Amenity {
  name: string;
  icon: React.ReactNode;
}

interface AccommodationCardProps {
  title: string;
  description: string;
  imageUrl: string;
  type: string;
  amenities: string[];
}

const amenityIcons: Record<string, string> = {
  'Pool': '🏊',
  'Free WiFi': '📶',
  'Breakfast': '☕',
  'Spa': '💆',
  'Restaurant': '🍽️',
  'Bar': '🍸'
};

const AccommodationCard: React.FC<AccommodationCardProps & { id: number }> = ({
  id,
  title,
  description,
  imageUrl,
  type,
  amenities = [],
}) => {
  return (
    <Link 
      href={`/accommodations/${id}`}
      className="block h-full"
    >
      <div className="bg-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full cursor-pointer">
        <div className="relative h-64 w-full">
          <Image
            src={imagekitUrl(imageUrl)}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <span className="absolute bottom-4 left-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            {type}
          </span>
        </div>
        <div className="p-5 flex flex-col">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-4">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const PopularHotelsAndLodges: React.FC = () => {
  const accommodations = [
    {
      id: 1,
      title: 'Shearwaters Explorers Village',
      description: 'Shearwater Explorers Village, near Victoria Falls, offers a peaceful garden setting with international cuisine at Explorer Bar and Grill, spa treatments, WiFi, and laundry facilities. Features include two outdoor pools, cycling opportunities, and access to a nearby nature reserve.',
      imageUrl: '/night-shots.jpg',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    },
    {
      id: 2,
      title: 'The Palm River Hotel',
      description: 'The Palm River Hotel offers a tranquil retreat near Victoria Falls with a full breakfast and daily managers reception. Guests enjoy the outdoor pool, spa services like manicures and massages, and free WiFi to stay connected throughout their stay.',
      imageUrl: '/pal4.jpeg',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Breakfast', 'Restaurant'],
    },
    {
      id: 3,
      title: 'Mbano Mano Hotel',
      description: 'Near Victoria Falls, Mbano Manor Hotel Victoria Falls By Mantis provides everything you need.',
      imageUrl: '/Sig.jpg',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    },
     {
      id: 4,
      title: 'Chundu Island',
      description: 'Escape to the serene surroundings of Chundu Island, where a cooked-to-order breakfast awaits on the picturesque terrace overlooking the garden. Relax by the pool with sun loungers or treat yourself to rejuvenating spa services and enjoy free WiFi.',
      imageUrl: '/chundu-island.png',
      type: 'Safari',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Breakfast'],
    },
    {
      id: 5,
      title: 'Victoria Falls Hotel',
      description: 'The Victoria Falls Hotel offers a tranquil retreat with its lush gardens and inviting outdoor pool. Guests savor international cuisine across four distinct restaurants, while the property s mini golf course provides entertainment and the spa delivers restorative treatments.',
      imageUrl: '/hotel.jpg',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    },
    {
      id: 6,
      title: 'Dzimbahwe Guest Lodge',
      description: 'Dzimbahwe Guest Lodge offers a peaceful garden setting where travelers can relax with a drink while taking in the scenery. The property features two outdoor swimming pools, barbecue facilities, and concierge services, with staff that guests consistently find helpful.',
      imageUrl: '/202.png',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Bar'],
    },
     {
      id: 7,
      title: 'Pioneer Camp',
      description: 'Pioneers Lodge offers a peaceful escape with a serene setting. Guests enjoy continental breakfast, then relax in the garden or spa. Two outdoor pools provide relaxation, and free WiFi keeps everyone connected. The 24/7 front desk team ensures a smooth stay.',
      imageUrl: '/pioneer.png',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Breakfast', 'Spa'],
    },
    {
      id: 8,
      title: 'Ilala Lodge Hotel',
      description: 'Ilala Lodge Hotel sits close to Victoria Falls, where guests can cool off at the poolside bar or book aromatherapy sessions and manicures at Ilala Spa. The restaurant serves Modern European cuisine, while practical amenities include free in-room WiFi and self parking.',
      imageUrl: '/ilala.jpg',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    },

    {
      id: 9,
      title: 'Old Drift Lodge',
      description: 'Old Drift Lodge offers a peaceful escape in Victoria Falls with beautiful gardens. The on-site restaurant serves daily meals, and guest rooms include WiFi. Explore nearby attractions by day and relax at the welcoming bar in the evening.',
      imageUrl: '/ODL-1.jpg',
      type: 'Luxury',
      amenities: ['Free WiFi', 'Restaurant', 'Bar'],
    },

    {
      id: 10,
      title: 'Elephant Hills',
      description: 'Elephant Hills Resort welcomes families with a riverfront view, 18-hole golf course, casino, and bowling alley. Enjoy facials and massages at the spa, a gym with racquetball and squash courts, three restaurants, and a poolside bar by three outdoor pools.',
      imageUrl: '/ele.png',
      type: 'Luxury',
      amenities: ['Pool', 'Free WiFi', 'Spa', 'Restaurant', 'Bar'],
    },
  ];

  const navigationPrevRef = React.useRef<HTMLButtonElement>(null);
  const navigationNextRef = React.useRef<HTMLButtonElement>(null);

  return (
    <section className="bg-white py-16 w-full">
      <div className="px-4 sm:px-4 lg:px-6 mx-auto max-w-[1540px]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div className="mb-4 md:mb-0">
            <span className="text-orange-500 text-sm font-medium uppercase tracking-wider">
              Places to Stay
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">
              Popular Hotels and Lodges
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/accommodations" 
              className="text-orange-600 hover:underline font-medium whitespace-nowrap"
            >
              View All Accommodations
            </a>
            <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
              <button
                ref={navigationPrevRef}
                className="p-2.5 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors text-orange-600"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                ref={navigationNextRef}
                className="p-2.5 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors text-white"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <Swiper
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            modules={[Navigation]}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onInit={(swiper) => {
              // @ts-expect-error Swiper navigation params can be boolean
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-expect-error Swiper navigation params can be boolean
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="pb-12"
          >
            {accommodations.map((item) => (
              <SwiperSlide key={item.id}>
                <AccommodationCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  type={item.type} amenities={[]}                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PopularHotelsAndLodges;
