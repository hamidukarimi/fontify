import React, { useState } from "react";

const defaultSections = [
  {
    title: "How does this app work?",
    body: "The bold text you see is actually Unicode — the standardized system for computer characters. Unicode includes tens of thousands of characters covering nearly every written language, symbols, and emoji. The bold variants are just different code points that look like bold letters.",
  },
  {
    title: "Where can I use this text?",
    body: "Because these are real Unicode characters (not HTML <strong>), they can be copied and pasted almost anywhere: social bios, comments, Wi‑Fi SSIDs, file names, bookmarks, instant messages, and more. Keep in mind platform differences: some systems may render a fallback font or not support every glyph.",
  },
];

export default function InfoSection({ sections = defaultSections }) {
  const [copied, setCopied] = useState(false);

  const sample = "𝗕𝗼𝗹𝗱 𝘁𝗲𝘅𝘁 — 𝐵𝑜𝗅𝗱 — 𝕭𝖔𝗅𝖉";

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch (e) {
        console.error("Copy failed", e);
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <section className="px-4 py-8 max-w-3xl mx-auto">
      <header className="mb-6">
        <h2 className="text-xl sm:text-3xl font-extrabold text-white">
          About bold Unicode text
        </h2>
        <p className="text-sm text-[#BCBCBC] mt-2">
          A short guide to where these characters come from and how to use them.
        </p>
      </header>

      <div className="space-y-6">
        {sections.map((s, i) => (
          <article
            key={i}
            className="bg-[rgba(255,255,255,0.02)]  rounded-lg border border-white/6"
            aria-labelledby={`section-${i}`}
          >
            <h2
              id={`section-${i}`}
              className="text-lg font-semibold text-white"
            >
              {s.title}
            </h2>
            <p className="text-[#BCBCBC] mt-3 leading-relaxed">{s.body}</p>
          </article>
        ))}

        <div className="bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-white/6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[#BCBCBC] text-sm">Live example (copyable):</p>
            <pre
              className="mt-2 font-mono text-sm text-white break-words select-all bg-transparent"
              aria-label="Unicode example"
            >
              {sample}
            </pre>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleCopy(sample)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/6 hover:bg-white/10 text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-pressed={copied}
              aria-label="Copy bold unicode example"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M9 12h6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="3" y="3" width="13" height="13" rx="2" />
                <rect x="8" y="8" width="13" height="13" rx="2" />
              </svg>
              Copy
            </button>

            <span
              className={`text-sm ${
                copied ? "text-green-400" : "text-[#BCBCBC]"
              } transition-all`}
              aria-hidden={!copied}
            >
              {copied ? "Copied!" : "Click to copy"}
            </span>
          </div>
        </div>

        <footer className="text-xs text-[#9b9b9b]">
          <p>
            Note: Some platforms or fonts may not support every Unicode bold
            glyph. If a glyph is missing the system will usually display a
            fallback form or a box.
          </p>
        </footer>
      </div>
    </section>
  );
}
