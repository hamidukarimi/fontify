// Testimonials.jsx
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import TestimonialCard from "./TestimonialCard";

const defaultTestimonials = [
  {
    id: 1,
    avatar: "./naeem.jpeg",
    name: "Naeem Hashemi",
    role: "CEO at Hashemi web services",
    rating: 5,
    text: "Super simple and fast. I use this website usually for my presentations titles and it always catches more attention.",
  },
  {
    id: 2,
    avatar: "./erfan.jpg",
    name: "Erfan Rahmatzai",
    role: "Front-End developer",
    rating: 5,
    text: "fontify made my Instagram posts stand out instantly. I love how quickly I can transform plain text into stylish fonts",
  },
  {
    id: 3,
    avatar: "./zakir.jpeg",
    name: "Zakirullah Aminy",
    role: "Student at Upskill",
    rating: 5,
    text: "To be honest, I’ve been using fancy text websites for my designs for a long time and tried a lot of text generators, but fontify feels the smoothest. It caught my attention because of its beautiful UI.",
  },
   {
    id: 4,
    avatar: "./sarah.jpg",
    name: "Sarah M",
    role: "Graphic Designer",
    rating: 5,
    text: "Changing fonts for my bio and captions has never been easier. I used to think I needed to add symbols around my words, but Fontify saves me so much time.",
  },
];

export default function Testimonials({ testimonials }) {
  // stable data if none provided
  const items = useMemo(
    () => testimonials ?? defaultTestimonials,
    [testimonials]
  );

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="px-4 py-8 max-w-6xl mx-auto mb-12"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2
            id="testimonials-heading"
            className="text-xl sm:text-2xl font-semibold text-white"
          >
            What our users review
          </h2>
          <p className="mt-1 text-sm text-[#BCBCBC]">
            Real feedback from learners who used the platform.
          </p>
        </div>

        {/* optional action — remove if you don't need a CTA here */}
        <div className="hidden sm:flex items-center">
          <button
            type="button"
            className="text-sm bg-white/6 hover:bg-white/10 text-white px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="See all reviews"
          >
            See all
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {items.map((t) => (
          <div
            key={t.id ?? `${t.name}-${t.role}`}
            role="listitem"
            className="transform transition duration-200 hover:-translate-y-1 focus-within:-translate-y-1"
          >
            <TestimonialCard
              avatar={t.avatar}
              name={t.name}
              role={t.role}
              rating={t.rating}
              text={t.text}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      avatar: PropTypes.string,
      name: PropTypes.string,
      role: PropTypes.string,
      rating: PropTypes.number,
      text: PropTypes.string,
    })
  ),
};

Testimonials.defaultProps = {
  testimonials: null, // will fall back to defaultTestimonials via useMemo
};
