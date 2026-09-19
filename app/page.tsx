import { apiGet, Activity } from "../lib/api";
import Navbar from './components/Navbar';
import BannerCarousel from './components/BannerCarousel';
import PopularActivities from './components/PopularActivities';
import PopularHotelsAndLodges from './components/PopularHotelsAndLodges';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import Destinations from './components/Destinations';
import Places from './components/Places'; 
import Activities from './components/Activities';






export default async function Home() {
  let activities: Activity[] = [];
  let activitiesUnavailable = false;
  try { activities = await apiGet<Activity[]>('/activities'); }
  catch { activitiesUnavailable = true; }
  const bannerData = [
    {
      title: "Discover Victoria Falls",
      subtitle: "Experience one of the world's greatest natural wonders, where mist, thunder, and breathtaking views come together for an unforgettable journey.",
      backgroundImage: "https://ik.imagekit.io/c0x52ylk1/New%20folder/ban.jpg",
      locationTag: "The most popular tourist destination",
      locationName: "The Victoria Falls"
    },
    {
      title: "The Finest Luxury Hotels",
      subtitle: "Indulge in world-class hotels where elegance, comfort, and breathtaking views create an exceptional escape.",
      backgroundImage: "https://ik.imagekit.io/c0x52ylk1/New%20folder/pal.jpeg",
      locationTag: "The most popular hotel this year ",
      locationName: "Palm River Hotel"
    },

    {
      title: "Wildlife Encounters",
      subtitle: "Authentic game drives led by experienced local guides, offering unforgettable wildlife encounters and deep insight into the African bush.",
      backgroundImage: "/pool.png",
      backgroundVideo: "https://ik.imagekit.io/c0x52ylk1/New%20folder/vid.mp4",
      locationTag: "Top wildlife safaris",
      locationName: "Wilderness Linkwasha Camp"
    }
  ];

  return (
    <div className="min-h-screen ">
      <Navbar />
      <BannerCarousel banners={bannerData} />
     <Destinations/>
     <Places/>
     <Activities activities={activities.slice(0, 4).map(a => ({ id: a.id, slug: a.slug, name: a.name, location: a.category, image: a.image || '', carImage: a.image || '', alt: a.name, description: a.description || '' }))}/>
     {activitiesUnavailable && <p className="bg-[#f8efe6] p-6 text-center text-[#3b2b18]">Experiences are temporarily unavailable. Please try again shortly.</p>}
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
     
  <Footer/>
    </div>
  );
}
