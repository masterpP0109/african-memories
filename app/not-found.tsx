import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
export default function NotFound() {
  return <main className="min-h-screen bg-[#f8efe6] text-[#3b2b18]">
    <Navbar />
    <section className="mx-auto max-w-3xl px-6 py-44 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-orange-700">A different path awaits</p>
      <h1 className="mt-6 text-4xl sm:text-6xl">Page not found</h1>
      <p className="mt-6 text-lg">This page may have moved or is no longer available.</p>
      <Link href="/adventures" className="mt-8 inline-block bg-[#3b2b18] px-8 py-4 text-white">Explore adventures</Link>
    </section>
    <Footer />
  </main>;
}
