import React from "react";

// TestimonialCard.jsx
// Exact pixel-based layout using Tailwind + a few inline styles for fine tuning.
// Drop this file into a React + Tailwind project.

export default function TestimonialCard({ avatar, name, role, rating, text }) {
  // exact card dimensions from the design
  // width: 360px, padding: 20px, radius: 12px
  return (
    <div
      className="w-full bg-[#262626] rounded-[12px] p-5 relative"
      style={{
        boxShadow: "0 12px 30px rgba(2,6,23,0.55)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <svg
            key={i}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block"
          >
            <path
              d="M12 2.5L14.9 8.45L21.3 9.27L16.6 13.65L17.9 20.02L12 16.9L6.1 20.02L7.4 13.65L2.7 9.27L9.1 8.45L12 2.5Z"
              fill="#FFD24A"
            />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <p className="text-[#D1D1D1]  leading-[22px] font-semibold">{text}</p>

      {/* divider line - teal thin */}
      <div className="mt-5 mb-4">
        <div className="h-[1px] w-full bg-[#097C87] opacity-80" />
      </div>

      {/* Avatar + name + role */}
      <div className="flex items-center gap-3 mt-2">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-[2px] border-transparent shadow-[inset_0_0_0_2px_rgba(255,255,255,0.03)]"
        />

        <div>
          <div className="text-white text-[17px] font-semibold leading-5">
            {name}
          </div>
          <div className="text-[#A5A5A5] text-[13px] mt-1">{role}</div>
        </div>
      </div>
    </div>
  );
}
