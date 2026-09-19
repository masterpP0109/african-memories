"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const blogPosts = [
  {
    title: "A Day in the Life of a Safari Explorer Experiencing Africa's Untamed Beauty",
    excerpt: "From sunrise game drives to sunset boat cruises, discover what a typical day looks like for a safari enthusiast exploring the vast African wilderness. Every moment brings a new wonder, from the golden light of dawn painting the savanna to the star-filled African sky at night.",
    date: "May 13, 2025",
    image: "https://images.pexels.com/photos/7839578/pexels-photo-7839578.jpeg",
    articleImage: "https://images.pexels.com/photos/16241908/pexels-photo-16241908.jpeg",
    slug: "a-day-in-the-life-of-a-safari-explorer",
    category: "Safari Life",
    content:
      "The first light of dawn breaks over the savanna, casting a golden hue across the endless plains. As the sky lightens, the calls of birds begin to echo through the acacia trees, signaling the start of another day in the African bush. Our safari explorer slips out of the canvas tent, the cool morning air a refreshing contrast to the stillness of the night.\n\nWith camera in hand, we set out in a sturdy 4x4 across the rugged tracks that wind through the reserve. The engine growls softly as we navigate the terrain, searching for the telltale signs of wildlife. A family of elephants ambles across the road ahead, their calm demeanor a reminder of the raw beauty that surrounds us. The matriarch leads the way, her trunk occasionally lifting to test the air for danger.\n\nBreakfast is served under the shade of an ancient baobab tree. Fresh fruit, coffee, and warm pastries provide sustenance before we venture further into the reserve. The afternoon brings a different rhythm to the bush. Predators emerge from their hiding spots, and the landscape transforms as shadows lengthen. A lone lioness stalks through the tall grass, her golden coat blending seamlessly with the terrain.\n\nAs the sun begins to set, painting the sky in brilliant oranges and reds, we find a scenic spot to watch the day fade away. The silence is broken only by the distant calls of nocturnal creatures. Dinner is a feast under the stars, with the Milky Way stretching overhead in a dazzling display of light. This is the magic of the African wilderness, a place where time slows down and every moment is a gift.",
  },
  {
    title: "Unveiling the Secrets of Kenya's Maasai Mara Wildlife Reserve",
    excerpt: "Explore the iconic Maasai Mara, home to the Great Migration and an unparalleled concentration of wildlife in the heart of East Africa.",
    date: "Apr 17, 2025",
    image: "https://images.pexels.com/photos/28157156/pexels-photo-28157156.jpeg",
    articleImage: "https://images.pexels.com/photos/13932855/pexels-photo-13932855.jpeg",
    slug: "unveiling-the-secrets-of-kenyas-maasai-mara",
    category: "Destinations",
    content:
      "The Maasai Mara National Reserve sprawls across the vast savanna of southwestern Kenya, a landscape of golden grasslands and acacia-dotted horizons. Named after the traditional Maasai people who have called this land home for centuries, the reserve is a treasure trove of natural wonders waiting to be discovered.\n\nAt the heart of the reserve lies the Great Migration, one of nature's most spectacular events. Over 1.5 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, make the perilous journey across the Mara River each year. The thundering hooves echo across the plains as they seek greener pastures, pursued by hungry predators lurking in the tall grass.\n\nThe diversity of wildlife here is staggering. Towering giraffes browse from the treetops while herds of elephants trudge through the dust. Leopards lounge in the shade of acacia trees, their spotted coats a masterclass in camouflage. The reserve is also home to the rare black rhinoceros, a critically endangered species that conservationists are working tirelessly to protect.\n\nFor the Maasai, the land holds deep spiritual significance. Their traditional way of life, centered around cattle herding and a profound connection to nature, has been shaped by the rhythms of the savanna. Visitors can experience this culture firsthand through traditional village visits, where stories are shared around the fire and ancient customs are passed down through generations.",
  },
  {
    title: "Mount Kilimanjaro Awaits: Conquer Africa's Highest Peak",
    excerpt: "Standing tall at 5,895 meters, Kilimanjaro beckons adventurers from around the world. Learn what it takes to summit the roof of Africa.",
    date: "Feb 12, 2025",
    image: "https://images.pexels.com/photos/8768454/pexels-photo-8768454.jpeg",
    articleImage: "https://images.pexels.com/photos/26924196/pexels-photo-26924196.jpeg",
    slug: "mount-kilimanjaro-awaits-conquer-africas-highest-peak",
    category: "Adventure",
    content:
      "Rising majestically from the Tanzanian landscape, Mount Kilimanjaro stands as Africa's highest peak at 5,895 meters above sea level. This dormant stratovolcano, with its distinctive snow-capped summit, has captivated adventurers for centuries. Unlike many high peaks, Kilimanjaro can be summited without technical climbing equipment, making it accessible to determined trekkers from all walks of life.\n\nThe journey to the roof of Africa is as much a mental challenge as it is a physical one. There are several established routes, each offering a unique perspective on the mountain's diverse ecosystems. The Marangu route, known for its hut accommodations, is the most popular. The Lemosho route, starting from the west, is favored by those seeking a more scenic and less crowded experience. Each path winds through lush rainforests, across barren lunar landscapes, and finally into the thin air of the alpine desert.\n\nThe climb is a test of endurance and willpower. As altitude increases, the air thins and every step becomes more laborious. The infamous 'summit night' begins around midnight, with climbers trudging through the dark in freezing temperatures. But those who persevere are rewarded with an unforgettable sunrise from the crater's edge, with views stretching across the African continent.\n\nFor many, reaching the summit of Kilimanjaro is a life-changing experience. It is a testament to human resilience and the power of determination. The mountain does not give its secrets easily, but those who earn its respect are forever changed by the journey.",
  },
  {
    title: "Witness the Majesty of Victoria Falls: A Zimbabwean Adventure",
    excerpt: "The smoke that thunders — Victoria Falls is one of the most breathtaking natural wonders on Earth. Discover its magic from the Zimbabwean side.",
    date: "Mar 25, 2025",
    image: "https://images.pexels.com/photos/16241873/pexels-photo-16241873.jpeg",
    articleImage: "https://images.pexels.com/photos/16241864/pexels-photo-16241864.jpeg",
    video: "https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Vids/WhatsApp%20Video%202026-07-15%20at%2012.47.18.mp4?updatedAt=1784210740812",
    slug: "witness-the-majesty-of-victoria-falls",
    category: "Destinations",
    content:
      "On the border between Zambia and Zimbabwe, the Zambezi River plunges over a mile-wide sheet of rock, creating Victoria Falls — one of the Seven Natural Wonders of the World. Known locally as 'Mosi-oa-Ye' (the smoke that thunders), the falls are a spectacle of raw power and beauty that must be seen to be believed.\n\nFrom the Zimbabwean side, visitors can walk along the rim of the falls, getting soaked by the fine mist that rises from the gorge below. The noise is thunderous, a constant roar that reverberates through the chest. Rainbows dance in the spray, creating a surreal atmosphere that feels almost otherworldly. The view from Knife-Edge Bridge offers a heart-stopping perspective, with the full might of the falls spread out before you.\n\nBut the adventure doesn't end there. Thrill-seekers can take a helicopter ride for aerial views of the falls, or join a sunset river cruise on the Zambezi. For the truly brave, white-water rafting through the calm pools below the falls offers an adrenaline-pumping experience. The diverse wildlife of the surrounding national park adds another layer of excitement, with elephants, buffalo, and elusive leopards roaming freely.\n\nThe cultural heritage of the region is equally compelling. Local guides share the legends of the falls, weaving tales of ancient spirits and forbidden love. The combination of natural beauty, thrilling activities, and rich culture makes Victoria Falls an unforgettable destination for any adventurer.",
  },
  {
    title: "How Sustainable Travel is Transforming Safaris",
    excerpt: "Eco-conscious tourism is reshaping the safari experience. Learn how sustainable practices are protecting wildlife and empowering local communities.",
    date: "Feb 7, 2025",
    image: "https://images.pexels.com/photos/28157155/pexels-photo-28157155.jpeg",
    articleImage: "https://images.pexels.com/photos/14074141/pexels-photo-14074141.jpeg",
    slug: "how-sustainable-travel-is-transforming-safaris",
    category: "Sustainability",
    content:
      "The face of safari tourism in Africa is undergoing a quiet revolution. As travelers become more conscious of their environmental impact, the industry is embracing sustainable practices that protect wildlife and empower local communities. This shift toward eco-conscious tourism is transforming the traditional safari model into a force for conservation and community development.\n\nAt the heart of this transformation are community-based conservancies. These areas, managed by local communities, provide economic incentives for wildlife conservation while offering authentic cultural experiences for visitors. In Namibia, communal conservancies have played a crucial role in reversing the decline of species such as the black rhinoceros and desert-adapted elephants. By generating revenue through tourism, local communities have a vested interest in protecting their natural heritage.\n\nTourism operators are also adopting innovative practices to minimize their footprint. Solar power systems reduce reliance on fossil fuels, while waste management programs ensure that nothing is left behind. Many lodges now source their food locally, supporting small-scale farmers and reducing the carbon cost of transportation. Water conservation techniques, such as rainwater harvesting and greywater recycling, help preserve this precious resource in arid regions.\n\nEducation plays a key role in sustainable safari tourism. Guides are trained not only in wildlife knowledge but also in conservation principles. Visitors leave with a deeper understanding of the delicate balance between humans and nature. This awareness creates a ripple effect, inspiring travelers to make more responsible choices long after they leave the African bush.\n\nThe future of safari tourism lies in this harmonious balance between adventure and responsibility. As more travelers seek meaningful experiences that give back to the places they visit, sustainable tourism will continue to evolve, ensuring that Africa's wildlife and wild places remain for generations to come.",
  },
  {
    title: "From Dunes to Wildlife: Exploring Namibia's Hidden Treasures",
    excerpt: "Beyond the famous Sossusvlei dunes, Namibia offers a wealth of wildlife and landscapes waiting to be discovered by the intrepid traveler.",
    date: "Feb 12, 2025",
    image: "https://images.pexels.com/photos/4914155/pexels-photo-4914155.jpeg",
    articleImage: "https://images.pexels.com/photos/4914155/pexels-photo-4914155.jpeg",
    slug: "from-dunes-to-wildlife-exploring-namibias-hidden-treasures",
    category: "Adventure",
    content:
      "Beyond the famous Sossusvlei dunes, Namibia offers a wealth of wildlife and landscapes waiting to be discovered by the intrepid traveler. From the stark beauty of the Namib Desert to the wildlife-rich savannas of Etosha National Park, Namibia is a land of dramatic contrasts and unforgettable experiences.\n\nThe towering red dunes of Sossusvlei are perhaps the most iconic landscape in southern Africa. Rising over 300 meters above the desert floor, these ancient dunes create a surreal spectacle of color and form, especially at sunrise and sunset when the sand glows fiery orange. Deadvlei, with its skeletal camelthorn trees standing in a white clay pan, is one of the most photographed locations on the continent.\n\nBut Namibia's beauty extends far beyond its desert. The Skeleton Coast, where the Atlantic meets the desert, is a haunting landscape of shipwrecks and seal colonies. In the north, Etosha National Park offers some of Africa's best game viewing, with elephants, lions, rhinos, and giraffes gathering around waterholes in the dry season. The Caprivi Strip provides lush riverine habitats along the Zambezi, while the Fish River Canyon rivals the Grand Canyon in its sheer scale.\n\nAdventure seekers can climb dunes, take scenic flights over the desert, or track desert-adapted elephants in the remote northwest. The country's German colonial history adds a unique cultural dimension, evident in the architecture of Windhoek and Swakopmund. With its low population density and commitment to conservation, Namibia remains one of Africa's last great frontiers.",
  },
  {
    title: "Lake Kariba: A Houseboat Safari on Africa's Largest Man-Made Lake",
    excerpt: "Cruise the vast waters of Lake Kariba, where tiger fish, sunsets, and swimming elephants create an unforgettable African experience.",
    date: "Sep 14, 2025",
    image: "https://ik.imagekit.io/c0x52ylk1/Resource/WhatsApp%20Image%202026-06-22%20at%2021.03.02.jpeg",
    slug: "lake-kariba-houseboat-safari-on-africas-largest-man-made-lake",
    category: "Adventure",
    content:
      "Stretching 300 kilometers along the Zambezi River valley, Lake Kariba is one of Africa's most awe-inspiring feats of engineering and one of its most spectacular tourist destinations. Created in the late 1950s by the construction of the Kariba Dam, this vast man-made lake is the world's largest reservoir by volume, covering an area larger than some small countries. Today, it is renowned for its houseboat safaris, excellent tiger fishing, and unique wildlife that has adapted to the aquatic environment.\n\nHouseboat cruises on Lake Kariba offer a completely different safari experience. Instead of game drives, you drift along the shoreline watching elephants swim between islands, buffalo grazing on the grassy banks, and pods of hippos surfacing in the distance. Houseboats range from basic craft to luxury floating hotels, complete with decks for sunset sundowners and bedrooms with views of the African wilderness. As the sun dips below the horizon, the lake transforms into a canvas of orange and purple, with silhouettes of elephants and hippos against the shimmering water.\n\nFishing enthusiasts from around the world flock to Lake Kariba for its legendary tiger fish. Known for their size and fighting spirit, these apex predators can weigh over 20 kilograms and put up a spectacular fight. Guided fishing excursions take you to the best spots along the shore, where you can try your luck at catching this fierce and beautiful species. The lake also supports large populations of bream, catfish, and tilapia.\n\nThe Matusadona National Park, situated on the lake's southern shore, provides a game-viewing complement to the aquatic experience. Here, black rhinos and elephants roam the rugged shoreline hills, while lions and hyenas patrol the grasslands. The park's isolation makes it a true wilderness, with very few visitors compared to other Zimbabwean reserves. Combining a few nights on a houseboat with a bush camp stay in Matusadona creates the ultimate Zimbabwean adventure.",
  },
  {
    title: "Gonarezhou: Zimbabwe's Last Great Wilderness",
    excerpt: "Remote and raw, Gonarezhou National Park offers an authentic bush experience far from the crowds, where elephants roam free and the landscape feels untouched by time.",
    date: "Aug 18, 2025",
    image: "https://fzs.org/wp-content/uploads/2021/05/dji_0575_camp-1350x1012-jpg.webp",
    articleImage: "https://fzs.org/wp-content/uploads/2021/05/dtr8454_elephants-1350x900-jpg.webp",
    slug: "gonarezhou-zimbabwes-last-great-wilderness",
    category: "Safari Life",
    content:
      "In the far southeast of Zimbabwe, bordering Mozambique's Limpopo National Park and South Africa's Kruger, lies Gonarezhou National Park — a vast, untamed wilderness that remains one of Africa's best-kept secrets. Covering over 5,000 square kilometers, this rugged park is part of the Great Limpopo Transfrontier Park, a peace park that allows wildlife to move freely across international borders.\n\nThe landscape here is dramatic and varied. Red sandstone cliffs, baobab-studded savannas, and the meandering Sabie and Luvuvhu rivers create a photographer's paradise. The park's name, Gonarezhou, means 'Place of the Elephants' in the local Shangani language, and it does not disappoint. Large herds of elephants, some with impressive tusks, traverse the park, along with buffalo, hippos, crocodiles, and an increasing number of lions and leopards.\n\nOne of Gonarezhou's highlights is the Chilojo Cliffs, towering red formations that rise above the landscape and offer spectacular viewpoints. Another is Tembwahata Pan, a natural waterhole that attracts abundant wildlife, especially during the dry season. For the adventurous traveler, the park offers walking safaris, guided hikes, and even cross-border excursions to nearby Kruger.\n\nAccommodation ranges from rustic bush camps to comfortable lodges, but the overriding feeling is one of solitude and raw nature. Without the crowds of Hwange or Mana Pools, Gonarezhou delivers an intimate, immersive safari experience that reconnects you with the primal rhythms of the African bush.",
  },
  {
    title: "Great Zimbabwe: Africa's Ancient Stone Legacy",
    excerpt: "Walk among the towering walls of medieval Africa's greatest stone city, a UNESCO treasure that tells the story of a powerful and sophisticated civilization.",
    date: "Jul 30, 2025",
    image: "https://cdn.britannica.com/15/153415-050-86C6DBCB/Ruins-Great-Zimbabwe.jpg",
    articleImage: "https://smarthistory.org/wp-content/uploads/2023/03/Great-zim-aerial-looking-West-copy-scaled.jpg",
    slug: "great-zimbabwe-africas-ancient-stone-legacy",
    category: "Heritage",
    content:
      "Rising from the granite hills of southeastern Zimbabwe, the ruins of Great Zimbabwe stand as a testament to the ingenuity and power of a medieval African civilization that once dominated the region's trade routes. Built between the 11th and 15th centuries, this UNESCO World Heritage Site is the largest stone structure in sub-Saharan Africa south of the pyramids, with walls reaching up to 11 meters high.\n\nThe most iconic feature is the Great Enclosure, a massive elliptical wall constructed without mortar, its stones carefully balanced to withstand centuries of weathering. Inside, narrow passages and towers reveal the architectural sophistication of the Shona people who built it. The Hill Complex, perched atop a rocky outcrop, likely served as the royal residence, while the Valley Ruins contain the remains of homes, workshops, and communal areas.\n\nGreat Zimbabwe was once a thriving center of trade, with gold, ivory, and copper flowing to the Swahili coast and beyond to China and India. Archaeologists have uncovered Persian pottery, Chinese porcelain, and glass beads, evidence of the city's far-reaching connections. The site was abandoned in the 15th century, likely due to overpopulation and resource depletion, but its legacy endures — the modern nation of Zimbabwe takes its name from these very ruins.\n\nA visit here is more than a history lesson; it is a spiritual experience. The silence of the ancient stones, the panoramic views from the hilltop, and the knowledge that this masterpiece was built entirely by hand create a profound connection to Africa's pre-colonial past. Nearby craft markets offer authentic Shona soapstone sculptures, allowing visitors to take home a piece of this living heritage.",
  },
  {
    title: "Eastern Highlands: Where Misty Peaks Meet Tranquil Valleys",
    excerpt: "Escape to Zimbabwe's lush Eastern Highlands, where emerald forests, cascading waterfalls, and cool mountain air offer the perfect counterpoint to the safari circuit.",
    date: "Sep 5, 2025",
    image: "https://www.robinpopesafaris.net/wp-content/uploads/chimanimani-scaled-1000x500.jpg",
    articleImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6zjbHmlidh5rwGyw9Rcg_U8JFed8bTQJI9NxXZJx5JG925_NOxMGlMH8&s=10",
    slug: "eastern-highlands-misty-peaks-tranquil-valleys",
    category: "Adventure",
    content:
      "Stretching along Zimbabwe's border with Mozambique, the Eastern Highlands are a world apart from the country's iconic savannas. This mountainous region, comprising the Nyanga, Vumba, and Chimanimani ranges, is a paradise of rolling green hills, ancient forests, and cool temperatures that provide a refreshing retreat from the lowland heat.\n\nNyanga National Park, Zimbabwe's highest conservation area, is the gateway to the highlands. Here, Mount Nyangani stands at 2,592 meters, the country's tallest peak. Hiking trails wind through montane grasslands and dense forests, leading to spectacular waterfalls like the 75-meter Mutarazi Falls, the second highest in Zimbabwe. Trout fishing in crystal-clear streams, horseback riding across the plateau, and golf on some of Africa's highest courses are just a few of the activities on offer.\n\nThe town of Mutare serves as the main access point, but the true gems lie along the winding mountain roads. The Vumba Forest Reserve, near the Mozambican border, is renowned for its birdlife and orchids, while the Chimanimani Mountains offer some of the best hiking in southern Africa, with trails leading to hidden waterfalls, ancient rock paintings, and panoramic views across the Mozambican plains.\n\nAccommodation in the highlands ranges from cozy country inns to luxury lodges with fireplaces and views of endless green. The region's cool, misty climate and tranquil atmosphere make it an ideal destination for hiking, birding, and simply unwinding amid natural beauty. Whether you're chasing waterfalls or savoring a warm cup of tea on a mountain terrace, the Eastern Highlands reveal a softer, greener side of Zimbabwe.",
  },
  {
    title: "Chinhoyi Caves: Zimbabwe's Subterranean Wonder",
    excerpt: "Dive into crystal-clear cobalt pools and explore limestone caves that have fascinated travelers and locals alike for centuries in central Zimbabwe.",
    date: "Oct 12, 2025",
    image: "https://zimbabwetourism.net/wp-content/uploads/2021/02/chinhoyi-caves-3.jpg",
    articleImage: "https://images.myguide-cdn.com/zimbabwe/companies/chinhoyi-caves-recreational-park/large/chinhoyi-caves-recreational-park-468282.jpg",
    slug: "chinhoyi-caves-zimbabwes-subterranean-wonder",
    category: "Adventure",
    content:
      "Just a short drive north of Harare, the Chinhoyi Caves offer one of Zimbabwe's most unique natural attractions. This system of limestone and dolomite caves is famous for its 'Sleeping Pool' or Chirorodziva — a crystal-clear cobalt blue pool that appears impossibly vivid against the dark cave walls. Legend has it that the pool is bottomless, and local tradition holds that the bodies of defeated warriors were once thrown into its depths.\n\nThe main cave system is relatively easy to explore, with well-maintained paths leading through chambers adorned with stalactites and stalagmites. The sunlight filtering through openings in the limestone creates dramatic patterns on the pool's surface, making it a photographer's dream. For the more adventurous, guided cave diving is available, revealing submerged passages and an underwater world rarely seen by visitors.\n\nBeyond the caves, the surrounding park offers picnic areas, game viewing, and opportunities to learn about the local Chewa people's cultural connection to this sacred site. The nearby town of Chinhoyi has a few comfortable lodges and restaurants, making the caves an easy and rewarding day trip from the capital or a convenient stop on the way to Mwanzi or Lake Kariba.\n\nWhether you're drawn by the legends, the beauty, or the thrill of cave exploration, Chinhoyi Caves provide a fascinating glimpse into Zimbabwe's geological and cultural heritage. The cool, constant temperature inside the caves offers a welcome escape from the heat, and the breathtaking clarity of the water is an unforgettable sight.",
  },
  {
    title: "Hwange National Park: Zimbabwe's Premier Safari Destination",
    excerpt: "Home to one of Africa's largest elephant populations, Hwange offers an authentic wilderness experience just a stone's throw from Victoria Falls.",
    date: "Jun 8, 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZtPVG440OqHNva6Q7BtkI_zTUD30xquMeMABZFYoFE5P_2OiJU9dcuSfJ&s=10",
    articleImage: "https://www.tripsavvy.com/thmb/OAVqobkfoo96uj7M4oIOkyWiko4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/long-line-960431864-a535bdd3d01f4013abb3bed1cabf49b9.jpg",
    slug: "hwange-national-park-zimbabwes-premier-safari",
    category: "Safari Life",
    content:
      "Spanning more than 14,600 square kilometers of pristine wilderness, Hwange National Park stands as Zimbabwe's largest and most diverse game reserve. Located in the northwest of the country, this vast expanse of teak forests, grasslands, and mopane woodlands harbors one of the greatest concentrations of wildlife on the African continent. With over 100 mammal species and 400 bird species recorded here, Hwange is a paradise for nature lovers and photographers alike.\n\nThe park's most celebrated residents are its massive elephant herds. During the dry season, thousands of elephants congregate around the artificial waterholes, creating unforgettable spectacles as they gather to drink, bathe, and socialize. These intelligent giants can often be seen up close, their trunks curling to spray water over their backs or gently touching calves in the herd. Lions, leopards, and cheetahs stalk the grasslands, while rare species like the African wild dog and roan antelope find refuge in the park's remote corners.\n\nWhat truly sets Hwange apart is its exclusivity. Unlike some of East Africa's more crowded reserves, Hwange remains remarkably uncrowded, allowing visitors to experience Africa's raw beauty in near solitude. The park's network of lodges and camps ranges from luxury tented accommodations to rustic bush camps, each offering an immersive safari experience under the vast African sky. Night drives reveal the secret lives of nocturnal creatures, from owls and genets to the elusive pangolin.\n\nThe best time to visit Hwange is during the dry season, from June to October, when wildlife viewing is at its peak. The contrast between the golden savanna and the deep blue sky creates a photographer's dream. Whether you're watching a herd of elephants silhouetted against a setting sun or listening to the distant roar of a lion at night, Hwange delivers the quintessential African safari experience.",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const similarPosts = [
    ...blogPosts.filter(p => p.category === post.category && p.slug !== post.slug),
    ...blogPosts.filter(p => p.category !== post.category),
  ].slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {post.video ? (
            <video
              src={post.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={post.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f7f4ee] to-transparent" />
      </section>

      <main className="mx-auto w-full max-w-[800px] px-6 py-8 md:px-8">
        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Meta */}
          <div className="mb-3 flex items-center gap-1.5 text-xs md:text-[12px]">
            <span className="text-[#6f6257]">
              {post.date}
            </span>

            <span className="text-[#c56a32]">&bull;</span>

            <span className="text-[#c56a32]">
              {post.category}
            </span>

            <span className="text-[#c56a32]">&bull;</span>

            <span className="text-[#c56a32]">
              Experience
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-[36px] font-normal leading-[1.08] tracking-[-0.02em] text-[#4B3621] md:text-[48px]">
            {post.title}
          </h1>
        </motion.header>

        {/* Article body */}
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5"
        >
          {post.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mb-3 text-[15px] leading-[1.7] text-[#403d39] md:text-[16px]"
            >
              {paragraph}
            </p>
          ))}

          {/* Main image */}
          <figure className="mt-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={post.articleImage || post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 720px) 100vw, 652px"
              />
            </div>

              <figcaption className="mt-1.5 text-center text-xs text-[#403d39]">
              The longer you stay, the richer the experience
            </figcaption>
          </figure>

          {/* Secondary section */}
          <section className="mt-5">
            <h2 className="font-serif text-[20px] font-normal leading-tight text-[#4B3621]">
              Landscapes made for slow exploration
            </h2>

            <p className="mt-2 text-[15px] leading-[1.7] text-[#403d39] md:text-[16px]">
              Once in the embrace of the lodge, there is much still to be
              explored. Since its opening, the property has been rewilded,
              allowing the forest and buffer zone to merge and endemic birds
              and wildlife to thrive.
            </p>

            <p className="mt-3 text-[15px] leading-[1.7] text-[#403d39] md:text-[16px]">
              Nature walks and birdwatching on the grounds are a gentle,
              contemplative way to learn about this landscape, and just one
              of the many ways to experience it.
            </p>
          </section>

          {/* Similar Blogs */}
          <section className="mt-8 mx-[-24px] md:mx-[-32px]">
            <div className="px-6 md:px-8">
              <h2 className="font-serif text-[20px] font-normal leading-tight text-[#4B3621]">
                Similar Blogs
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {similarPosts.map((sp) => (
                <Link
                  key={sp.slug}
                  href={`/blog/${sp.slug}`}
                  className="group flex items-start gap-3"
                >
                  <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded">
                    <Image
                      src={sp.image}
                      alt={sp.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#4B3621] group-hover:text-[#c56a32]">
                      {sp.title}
                    </p>
                    <p className="text-xs text-[#6f6257]">
                      {sp.date} &bull; {sp.category}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
