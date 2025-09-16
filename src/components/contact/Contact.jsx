import React from "react";
import Header from "../Header";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonItem = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Contact() {
  return (
    <>
      <div
        className="min-h-screen   bg-[#0b1220] pb-8"
        style={{
          // replace the url('') with your background image path or online image
          backgroundImage: `url("./bg-2.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sticky top-0 z-50 mb-11">
          <Header />
        </div>
        {/* dark translucent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071021]/80 via-[#0b1b2a]/70 to-[#071219]/80 " />

        {/* soft colored blurred blobs (decorative) */}
        <div
          aria-hidden
          className="absolute -left-12 -top-12 w-44 h-44 rounded-full filter blur-3xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #f6c76b, transparent 40%)",
          }}
        />
        <div
          aria-hidden
          className="absolute right-0 -top-20 w-48 h-48 rounded-full filter blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, #e68fae, transparent 40%)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-16 bottom-8 w-40 h-40 rounded-full filter blur-3xl opacity-20"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, #4fb6a5, transparent 40%)",
          }}
        />

        <div className="relative p-4 pb-10">
          {/* header */}
          <motion.div
            className="mb-6 text-white/90"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.p
              className="text-sm font-medium text-white/80"
              variants={item}
            >
              Get in Touch
            </motion.p>

            <motion.h1
              className="mt-3 text-[30px] sm:text-3xl font-extrabold leading-tight"
              variants={item}
            >
              We’r here for you
            </motion.h1>

            <motion.h2
              className="mt-3 text-[30px] sm:text-3xl font-extrabold leading-tight "
              variants={item}
            >
              Have questions, ideas, or{" "}
              <span className="text-[#097C87]">feedback?</span>
            </motion.h2>

            <motion.p className="my-7 text-sm text-white/60" variants={item}>
              Whether you have a question, feedback, or just want to say hello —
              the fontify team is always just a message away
            </motion.p>

            <motion.div className="mt-5 flex gap-3" variants={container}>
              <motion.div variants={buttonItem}>
                <Link to="/">
                  <button className="px-4 py-2 rounded-full border border-white/30 text-sm text-white/90 bg-transparent">
                    Explore more
                  </button>
                </Link>
              </motion.div>

              <motion.div variants={buttonItem}>
                <Link to="/">
                  <button className="px-4 py-2 rounded-full bg-[#097C87] text-sm font-medium text-white">
                    Register now
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Form title */}
          <motion.div
            className="mt-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
          >
            <motion.h3
              className="text-lg font-semibold text-white"
              variants={item}
            >
              Contact fontify team
            </motion.h3>

            <motion.form className="mt-4 space-y-3" variants={container}>
              <motion.input
                aria-label="full-name"
                placeholder="Enter Your full name"
                className="w-full rounded-xl bg-white/6 backdrop-blur-sm px-4 py-3 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-[#097C87]"
                variants={item}
              />

              <motion.input
                aria-label="email"
                placeholder="Enter Your Email"
                className="w-full rounded-xl bg-white/6 backdrop-blur-sm px-4 py-3 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-[#097C87]"
                variants={item}
              />

              <motion.input
                aria-label="subject"
                placeholder="Type the subject"
                className="w-full rounded-xl bg-white/6 backdrop-blur-sm px-4 py-3 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-[#097C87]"
                variants={item}
              />

              <motion.textarea
                aria-label="message"
                placeholder="write your message"
                rows={4}
                className="w-full rounded-xl bg-white/6 backdrop-blur-sm px-4 py-3 placeholder:text-white/40 text-white outline-none focus:ring-2 focus:ring-[#097C87] resize-none"
                variants={item}
              />

              <motion.button
                type="button"
                className="w-full mt-2 rounded-xl py-3 bg-[#097C87] text-white font-semibold"
                variants={buttonItem}
              >
                Send Message
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
