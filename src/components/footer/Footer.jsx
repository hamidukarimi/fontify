import React from "react";
import {
  FaBeer,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdHome } from "react-icons/md";

/**
 * Footer.jsx
 * Pixel-accurate footer built with Tailwind CSS.
 * Drop into a React + Tailwind project.
 *
 * Notes:
 * - Colors, spacing and sizes tuned to match the provided mockup.
 * - All icons are inline SVGs so you don't need extra icon libraries.
 * - Modify the `logo` text or SVG to match your brand.
 */

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      {/* CTA area */}
      <div className="max-w-3xl mx-auto text-center px-6 py-10">
        <h3 className="text-2xl font-semibold leading-tight">Need Guidance?</h3>
        <p className="mt-3 text-sm text-[#bdbdbd]">
          Need help? We're always here for you. lorem
        </p>
        <button
          type="button"
          className="mt-6 inline-block px-5 py-2.5 rounded-md bg-[#098989] text-white text-sm font-medium shadow-[0_6px_18px_rgba(3,8,12,0.5)] hover:bg-[#0b9a9a] focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Contact Us
        </button>
      </div>

      {/* Thin separator */}
      <div className="border-t border-gray-700" />

      {/* Main footer content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Brand row */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            {/* circular logo */}
            <img src="./fontify.svg" alt="" />
          </div>

          {/* nav links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#bdbdbd]">
            <a href="#" className="hover:text-white">
              connect
            </a>
            <a href="#" className="hover:text-white">
              connect thom
            </a>
            <a href="#" className="hover:text-white">
              look for
            </a>
            <a href="#" className="hover:text-white">
              connect she
            </a>
            <a href="#" className="hover:text-white">
              make it
            </a>
            <a href="#" className="hover:text-white">
              look for latest
            </a>
          </div>

          {/* social icons row */}
          <div className="flex items-center gap-4 mt-3">
            {/* circular icon button (example: brand icon) */}

            {/* small teal circular icons */}
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#097C87] "
            >
              <img src="./reab.svg" alt="" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#097C87]"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#097C87]"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#097C87]"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#097C87]"
            >
              <FaGithub />
            </a>

            {/* language button */}
            <button className="ml-3 px-3 py-1 rounded-full border border-[#0e8b8b] text-sm text-[#bdbdbd] hover:text-white">
              English
            </button>
          </div>

          {/* copyright */}
          <div className="mt-6 text-sm text-[#9b9b9b]">Copy right - 2025</div>
        </div>
      </div>
    </footer>
  );
}
