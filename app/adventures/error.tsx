"use client";
import Link from 'next/link';
export default function AdventureError({ reset }: { reset: () => void }) {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8efe6] px-6 text-center text-[#3b2b18]">
    <h1 className="text-4xl">We couldn?t load this experience</h1>
    <p className="mt-4">Please try again in a moment, or contact our team for help.</p>
    <button onClick={reset} className="mt-8 bg-[#3b2b18] px-8 py-4 text-white">Try again</button>
    <Link href="/adventures" className="mt-6 underline">Back to adventures</Link>
  </main>;
}
