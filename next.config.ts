import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dynamic-media-cdn.tripadvisor.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.ilalalodge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.palmriverhotel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fzs.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.britannica.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'smarthistory.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.robinpopesafaris.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'zimbabwetourism.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.myguidezimbabwe.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.myguide-cdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tripsavvy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'palmriverhotel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ilalalodge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pamusha.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mbanomanorhotel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'explorersvillage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lokuthula.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fothergill.travel',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hwangesafarilodge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'victoria-falls-safari-collection.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'elephanthillshotel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'chundu.co.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-ileieij.nitrocdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'matetsivictoriafalls.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.victoriafallshotel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.wonderfulzimbabwe.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.africaendeavours.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.audleytravel.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.visitkariba.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'karibahouseboats.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hideawaysafrica.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wildhorizons.co.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'roxannereid.co.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.roxannereid.co.za',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'shearwatervictoriafalls.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shearwatervictoriafalls.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.expertafrica.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.naturalhighsafaris.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.andbeyond.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'machabasafaris.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.masaimara.travel',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
