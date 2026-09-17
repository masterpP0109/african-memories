import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdventureHero from "../components/AdventureHero";
import AdventureCards from "../components/AdventureCards";
import { apiGet, Activity } from "../../lib/api";

export const metadata = {
  title: "Adventures & Things to Do - African Memories",
  description: "Discover unforgettable adventures across Africa's untamed landscapes. From wildlife safaris to adrenaline-pumping activities.",
};

export default async function AdventuresPage() {
  let adventures: Activity[] = [];
  let error: string | null = null;

  try {
    adventures = await apiGet<Activity[]>('/activities');
  } catch (err) {
    error = (err as Error).message;
  }

  const adventureCards = adventures.map((activity) => ({
    id: activity.id,
    title: activity.name,
    description: activity.description || '',
    image: activity.image || '',
    category: activity.category,
    slug: activity.slug,
  }));

  return (
    <div className="min-h-screen">
      <Navbar />
      <AdventureHero />
      <AdventureCards
        adventures={error ? null : adventureCards}
        loading={false}
        error={error}
      />
      <Footer />
    </div>
  );
}
