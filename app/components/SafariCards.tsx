"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Home,
  Tent,
  Trees,
  Waves,
  Trophy,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const lodges = [
  {
    id: 1,
    title: "Palm River Lodge",
    slug: "palm-river-lodge",
    price: "FROM US$1420 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "8 Tented Suites",
    feature2: "Pool & Spa",
    description:
      "The Palm River Hotel offers a tranquil retreat near Victoria Falls with a full breakfast and daily managers reception. Guests enjoy the outdoor pool, spa services like manicures and massages, and free WiFi to stay connected throughout their stay.",
    button: "Discover",
    image:
      "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/Palm%20River%20Lodge/Swimming-Pool-1350x900.jpeg?updatedAt=1778156387582",
    logo: "https://www.palmriverhotel.com/wp-content/themes/_palmriverhotel/images/the-palm-river-hotel-logo-web.png",
  },
  {
    id: 2,
    title: "Victoria Falls Safari Lodge",
    slug: "victoria-falls-safari-lodge",
    price: "FROM US$1370 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "5 Vintage Tents",
    feature2: "Big Game Area",
    description:
      "Located in Victoria Falls, within 3.1 mi of the Victoria Falls Bridge, Victoria Falls Safari Lodge offers 4-star accommodations with a garden, a terrace and a bar.",
    button: "Explore",
    image:
      "https://ik.imagekit.io/c0x52ylk1/Safari%20Lodge/victoria-falls-safari-lodge-21.webp?updatedAt=1778529081755",
    logo: "https://ik.imagekit.io/c0x52ylk1/logo-dark-removebg-preview.png",
  },
  {
    id: 3,
    title: "Ilala Lodge Hotel",
    slug: "ilala-lodge-hotel",
    price: "FROM US$9870 PER CAMP PER NIGHT",
    location: "Victoria Falls",
    feature1: "4 Luxury Tents",
    feature2: "Exclusive Use",
    description:
      "Ilala Lodge Hotel is a family-run hotel nestled in the heart of Victoria Falls town, only an 8 minute walk away from the Natural World Wonder, Victoria Falls, making it geographically the closest hotel to the waterfall in Zimbabwe.",
    button: "Explore",
    image:
      "https://www.ilalalodge.com/wp-content/uploads/2017/03/KLRS2091-1-1500x957.jpg",
    logo: "https://www.ilalalodge.com/wp-content/themes/_ilalalodge/images/ilala-lodge-logo.png",
  },
  {
    id: 4,
    title: "Pamusha Lodge",
    slug: "pamusha-lodge",
    price: "FROM US$1850 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "12 Luxury Tents",
    feature2: "Game Drives",
    description:
      "The accommodation facility is about 20 minutes walk from the city. It is also 20km from the airport. We also offer accommodation for groups, independent travelers, backpackers and private clients. ",
    button: "Discover",
    image:
      "https://ik.imagekit.io/c0x52ylk1/Pamusha%20Lodge/Pamusha-familynew-768x600.jpg?updatedAt=1778529149773",
    logo: "https://www.pamusha.com/wp-content/uploads/2025/11/pamushalogo.svg",
  },
  {
    id: 5,
    title: "Victoria Falls Pioneer Camp",
    slug: "victoria-falls-pioneer-camp",
    price: "FROM US$2100 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "15 Suite Tents",
    feature2: "Crater Views",
    description:
      "Set in lush gardens with beautifully manicured lawns, this fifty room lodge is a great option for those who value comfort and elegance. The rooms are spacious and tastefully decorated in a classic style, and each has a clear and open view of the garden. ",
    button: "Explore",
    image:
      "https://ik.imagekit.io/c0x52ylk1/Pioneer%20Lodge/unnamed%20(1).jpg?updatedAt=1778529636152",
    logo: "https://ik.imagekit.io/c0x52ylk1/PioneersLogo-RGB-removebg-preview.png",
  },
  {
    id: 6,
    title: "Troutbeck Resort",
    slug: "troutbeck-resort",
    price: "FROM US$950 PER PERSON PER NIGHT",
    location: "Nyanga",
    feature1: "20 Rooms",
    feature2: "Treehouse Views",
    description:
      "Troutbeck Resort is situated at the foot of ancient pine-treed hills and overlooks a trout-filled lake. The hotel was built and founded by Major Herbert MacIlwaine in 1947 and has undergone considerable changes over the years.",
    button: "Discover",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/d3/35/f4/caption.jpg?w=900&h=-1&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/Troutback.png-removebg-preview.png",
  },
  {
    id: 7,
    title: "Elephant Hills Resort",
    slug: "elephant-hills-resort",
    price: "FROM US$890 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "18 Treehouse Suites",
    feature2: "Viewing Deck",
    description:
      "his majestic hotel, aptly named after the gentle giant of the bush (the elephant) merges seamlessly into its natural environment. Elephant Hills Resort has 276 rooms ranging from the impressive presidential suite to cool and spacious standard rooms. ",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/fb/c7/e8/photo0jpg.jpg?w=900&h=500&s=1",
    logo: "https://www.elephanthillshotel.com/wp-content/uploads/ehh-main-logo-horizontal-white-239x59.png",
  },
  {
    id: 8,
    title: "Mbano Manor Hotel",
    slug: "mbano-manor-hotel",
    price: "FROM US$1680 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "10 Luxury Tents",
    feature2: "River Access",
    description:
      "Mbano Manor Hotel Victoria Falls is an intimate 19-suite luxury boutique hotel in Victoria Falls. Nestled in an ancient teak forest located on the edge of town. Our eco-luxury experience comprises of 18 luxury suites and one forest villa. ",
    button: "Explore",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/25/37/3d/mbano-manor-hotel-victoria.jpg?w=900&h=500&s=1",
    logo: "https://www.mbanomanorhotel.com/wp-content/uploads/2025/11/MbanoLogoWeb.png",
  },
  {
    id: 9,
    title: "Explorers Village",
    slug: "explorers-village",
    price: "FROM US$1250 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "22 Suite Tents",
    feature2: "River Views",
    description:
      "Budget accommodation with luxury flair - Shearwater Explorers Village offers 96 rooms (54 deluxe rooms (4-Star), 42 standard rooms (3-Star) and also offers some serviced camping facilities.) All done up with modern Afrocentric aesthetic decor, fashioned from high quality sustainable material. ",
    button: "Discover",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/f4/74/c7/caption.jpg?w=900&h=500&s=1 ",
    logo: "https://ik.imagekit.io/c0x52ylk1/Shearwater-Explorers-Village-removebg-preview.png",
  },
  {
    id: 10,
    title: "Dzimbahwe Guest Lodge",
    slug: "dzimbahwe-guest-lodge",
    price: "FROM US$2400 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "6 Exclusive Tents",
    feature2: "Fly-in Safari",
    description:
      "Dzimbahwe Guest Lodge closer to home. Bed and breakfast with option of self catering on apartment rooms, with two swimming pools, restaurant and reception area.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/b4/cf/7a/dzimbahwe-guest-lodge.jpg?w=1000&h=-1&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/dzimbahwe-guesstlogo-removebg-preview.png",
  },
  {
    id: 11,
    title: "Old drift Lodge",
    slug: "old-drift-lodge",
    price: "FROM US$780 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "16 Luxury Rooms",
    feature2: "Pool & Lounge",
    description:
      "Old Drift Lodge is an extraordinary new luxury tented lodge on the banks of the Zambezi River, a bush paradise that exudes an old world charm, admits modern luxuries. ",
    button: "Explore",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/03/03/30/at-old-drift-lodge-each.jpg?w=1000&h=-1&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/Group-262-removebg-preview.png",
  },
  {
    id: 12,
    title: "Chundu Island",
    slug: "chundu-island",
    price: "FROM US$650 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "29 Plantation Rooms",
    feature2: "Coffee Estate",
    description:
      "Private and peaceful, a birdlover’s paradise bounded by wildlife, here you will find the best of Africa’s natural offerings from a seasonal beach and flooded marshes to lush wetlands and open grasslands",
    button: "Discover",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/65/42/79/chundu-island.jpg?w=1000&h=-1&s=1",
    logo: "https://www.chundu.co.za/wp-content/uploads/al_opt_content/IMAGE/chundu.co.za/wp-content/uploads/2020/02/chundu-island-mobile-logo-retina.png.bv.webp?bv_host=chundu.co.za",
  },
  {
    id: 13,
    title: "Matetsi River Lodge",
    slug: "matetsi-river-lodge",
    price: "FROM US$1750 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "8 En-suite Tents",
    feature2: "Great Migration",
    description:
      "5-Star rated Matetsi Victoria Falls on the pristine 55 000 hectare Matetsi Private Game Reserve, offers a safari oasis that combines an exceptional wildlife experience and 15km (9.3 miles) of private Zambezi River frontage with easy access to the majestic Victoria Falls. ",
    button: "Explore",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/e9/a3/15/lodge-lap-pool.jpg?w=900&h=500&s=1",
    logo: "https://matetsivictoriafalls.com/app/uploads/2020/06/Matetsi_logo_white.svg",
  },
  {
    id: 14,
    title: "Victoria Falls Hotel",
    slug: "victoria-falls-hotel",
    price: "FROM US$920 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "21 Garden Rooms",
    feature2: "Mountain Views",
    description:
      "EDWARDIAN STYLE HOTEL Established in 1904, The Victoria Falls Hotel overlooks the magnificent Batoka Gorge with the Victoria Falls only a 10 minute walk away through the hotel’s path, 22km from Victoria Falls Airport. The hotel is set in lush gardens, with three restaurants, a swimming pool, spa, hair salon, gym, mini golf (putt putt), in addition assortment of local art throughout the hotel grounds. ",
    button: "Discover",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/4b/55/c9/the-grande-dame-of-victoria.jpg?w=800&h=500&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/logo-3-removebg-preview.png",
  },
  {
    id: 15,
    title: "Batonka Guest Lodge",
    slug: "batonka-guest-lodge",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Just 2.2 kilometers from the Victoria Falls Rainforest entrance and 1km from the town centre, Batonka Guest Lodge is situated in the quiet residential suburb of Victoria Falls.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/5e/a4/b7/batonka-guest-lodge.jpg?w=1000&h=-1&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/Batonka-Guest-Lodge-Logo-copy-300x77-removebg-preview.png",
  },

  {
    id: 16,
    title: "Wallow Lodge",
    slug: "wallow-lodge",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Situated overlooking the Masuwe River, The Wallow Lodge offers an intimate safari getaway in the heart of a private concession within Victoria Falls National Park. The lodge is set along the banks of the Masuwe River, surrounded by 4,500 acres of wilderness that stretches into the horizon, where a cloud of mist from the ‘Mosi-Au-Tunya’ commands the skyline.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/32/fa/c2/panoramic-views-of-the.jpg?w=800&h=500&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/Group-262-removebg-preview.png",
  },
  {
    id: 17,
    title: "Lokuthula Lodges",
    slug: "lokuthula-lodges",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "The 31 Lokuthula Lodges offer exceptional value for money and are located in the grounds of the Victoria Falls Safari Lodge estate just 4km/2.5ml from the Victoria Falls, one of the Seven Natural Wonders of the World.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/44/c8/dd/free-loungers-at-lokuthula.jpg?w=900&h=500&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/logo-dark-removebg-preview.png",
  },

  
   {
    id: 18,
    title: "Rainbow Hotel",
    slug: "rainbow-hotel",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Victoria Falls",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "A unique property of Moorish architecture conveniently located near town and 2km from the Victoria Falls. The Victoria Falls Rainbow Hotel offers a spectacular view of the rumbling mist, mosi-oa-tunya, meaning the smoke that thunders. Enjoy a cocktail at the only Swim and Sip bar in town and efficient and friendly service.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/cd/4c/70/rainbow-hotel-victoria.jpg?w=900&h=500&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/images-removebg-preview.png",
  },
   {
    id: 19,
    title: "Fothergill Island",
    slug: "fothergill-island",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Kariba",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "On the shores of Lake Kariba, within the Matusadona National Park in Zimbabwe, rests our magical oasis of Fothergill Island. A place where travel dreams, rich African traditions, and colourful history combine to form a safari experience like no other. An island paradise with a beautiful transformation story, reflecting Zimbabwe's own rebirth as a world-class conservation and tourism destination. ",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/f2/a2/f1/main-entertainment-area.jpg?w=1000&h=-1&s=1",
    logo: "https://fothergill.travel/wp-content/themes/fothergill/images/logo.svg",
  },
   {
    id: 20,
    title: "Spurwing Island",
    slug: "spurwing-island",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Kariba",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Situated on Lake Kariba in the middle of one of Africa’s most spectacular lakes, overlooked by the majestic Matusadona Mountains, Spurwing Island Lodge is the perfect place for a tranquil getaway for the wildlife enthusiast, serious fisherman and holiday maker alike.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/96/b2/4b/spurwing-island.jpg?w=900&h=500&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/Spurwing-Island-Lodge-Logo-removebg-preview.png",
  },
  {
    id: 21,
    title: "Bumi Hills Safari Lodge",
    slug: "bumi-hills-safari-lodge",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Kariba",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Experience the beauty of Zimbabwe's wilderness at Bumi Hills Safari Lodge, nestled on the shores of Lake Kariba. This exclusive retreat offers a perfect blend of comfort and adventure, with stunning views of the surrounding landscape.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/45/ae/2f/sunset-over-the-iconic.jpg?w=900&h=500&s=1",
    logo: "https://cdn-ileieij.nitrocdn.com/sDgFFEAOxknYDznnqCsxErFonOSAAYlc/assets/images/optimized/rev-e70b6ed/africanbushcamps.com/wp-content/themes/african-bush-camps/img/header-logo.svg",
  },

   {
    id: 22,
    title: "Caribean Bay Hotel",
    slug: "caribean-bay-hotel",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Kariba",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Caribbea Bay is the ultimate one-stop entertainment and leisure hotel in Kariba. With a dedicated play area for children offering a range of activities including the popular Supatube Waterslide, Caribbea Bay is the perfect retreat for family vacations. ",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/ff/0a/85/caribbea-bay-hotel-casino.jpg?w=900&h=500&s=1",
    logo: "https://www.visitkariba.com/images/accommodation/caribbea-bay-hotel/0019.png",
  },
  {
    id: 23,
    title: "Hwange Safari Lodge",
    slug: "hwange-safari-lodge",
    price: "FROM US$1100 PER PERSON PER NIGHT",
    location: "Hwange",
    feature1: "12 Beach Villas",
    feature2: "Private Beach",
    description:
      "Hwange Safari Lodge offers a unique opportunity to experience the wonders of Zimbabwe's wildlife. Located in the heart of the Hwange National Park, this lodge provides an immersive safari experience with comfortable accommodations and expert-guided tours.",
    button: "Connect",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/d0/b9/df/20180411-090930-largejpg.jpg?w=1000&h=-1&s=1",
    logo: "https://ik.imagekit.io/c0x52ylk1/images-removebg-preview%20(1).png",
  },
];

const Icon = ({ text }: { text?: string }) => {
  const value = (text || "").toLowerCase();

  if (value.includes("pool")) return <Waves size={15} />;
  if (value.includes("tent")) return <Tent size={15} />;
  if (value.includes("game")) return <Trees size={15} />;
  if (value.includes("exclusive")) return <Trophy size={15} />;

  return <Home size={15} />;
};

export default function SafariCards({ heading }: { heading?: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;
  const totalPages = Math.ceil(lodges.length / hotelsPerPage);
  const startIndex = (currentPage - 1) * hotelsPerPage;
  const visibleLodges = lodges.slice(startIndex, startIndex + hotelsPerPage);

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-8">
        {heading && (
          <div className="mb-12 flex items-center justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-orange-500">
                Places to Stay
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight text-[#3b2b18] sm:text-5xl">
                {heading}
              </h2>
            </div>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleLodges.map((lodge, index) => (
            <Link
              key={lodge.id}
              href={`/places-to-stay/${lodge.slug}`}
              className="group flex flex-col h-full bg-white overflow-hidden animate-fade-in-up"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <article className="flex h-full flex-col">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={lodge.image}
                    alt={lodge.title}
                    className="h-[520px] w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {lodge.logo ? (
                    <div className="absolute bottom-8 left-1/2 h-32 w-auto max-w-[80%] -translate-x-1/2 transition-opacity duration-300 group-hover:opacity-0">
                      <img
                        src={lodge.logo}
                        alt={`${lodge.title} logo`}
                        className="h-full w-full object-contain"
                        style={{ filter: ["Elephant Hills Resort", "Matetsi River Lodge", "Victoria Falls Hotel", "Bumi Hills Safari Lodge"].includes(lodge.title) ? "none" : "brightness(0) invert(1)" }}
                      />
                    </div>
                  ) : (
                    <div className="absolute bottom-8 left-8 right-8 text-center transition-opacity duration-300 group-hover:opacity-0">
                      <h2 className="text-4xl font-serif">{lodge.title}</h2>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-serif text-white mb-4">{lodge.title}</h3>
                    <p className="text-white text-sm leading-relaxed line-clamp-3">
                      {lodge.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-orange-300 uppercase tracking-widest text-sm font-semibold">
                      {lodge.button}
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex flex-col gap-4 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-600">
              Showing {startIndex + 1}-{Math.min(startIndex + hotelsPerPage, lodges.length)} of {lodges.length} hotels
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous page"
              >
                <ArrowLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-orange-500 text-white"
                      : "border border-stone-300 text-stone-700 hover:border-orange-500 hover:text-orange-600"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next page"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
