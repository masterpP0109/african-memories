import React from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaArrowRight,
} from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3b2b18] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-16 py-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr_1fr]">
          {/* CONTACT */}
          <div>
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[4px] text-[#f7ede0]">
              Contact Us
            </h3>

            <div className="space-y-3 text-lg">
              <p>African Memories Safaris</p>
              <p>4920 Chinotimba Victoria Falls</p>

              <p className="pt-3">+263 772 260 839</p>

              <p>info@africanmemories.com</p>
            </div>

            <div className="mt-14 flex items-center gap-5 text-[30px] text-[#f7ede0]">
              <a
                href="#"
                className="transition hover:text-white"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="transition hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="transition hover:text-white"
                aria-label="TripAdvisor"
              >
                <SiTripadvisor />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[4px] text-[#f7ede0]">
              Quick Links
            </h3>

            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-20 text-lg">
              <Link href="/" className="hover:text-[#C7A27C] transition">
                Home
              </Link>

              <Link href="/adventures" className="hover:text-[#C7A27C] transition">
                Things To Do
              </Link>

              <Link href="/places-to-stay" className="hover:text-[#C7A27C] transition">
                Places To Stay
              </Link>

              <a href="#gallery" className="hover:text-[#C7A27C] transition">
                Gallery
              </a>

              <Link href="/blog" className="hover:text-[#C7A27C] transition">
                Blog
              </Link>

              <Link href="/about" className="hover:text-[#C7A27C] transition">
                About
              </Link>

              <Link href="/contact" className="hover:text-[#C7A27C] transition">
                Contact
              </Link>

             
            </div>

          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="mb-8 text-sm font-semibold uppercase tracking-[4px] text-[#f7ede0]">
              Sign Up To Our Newsletter
            </h3>

            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-[#3A3434] px-4 py-3 text-white placeholder:text-gray-300 outline-none"
              />

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              >
                <FaArrowRight />
              </button>
            </div>

            {/* LOGO */}
            <div className="mt-16 flex justify-center">
              <img
                src="https://ik.imagekit.io/c0x52ylk1/African%20Memories%20Resources/logo.png?updatedAt=1778267349365"
                alt="African Memories"
                className="h-28 w-auto object-contain opacity-90"
              />
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#f7ede0]/20 pt-6 mt-8">
          <p className="text-center text-sm text-[#f7ede0]">
            &copy; {new Date().getFullYear()} African Memories Safaris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;