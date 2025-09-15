import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ============================
   Helper transforms (in-file)
   ============================ */

// Fullwidth
function toFullwidth(text) {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xff01 - 33);
      return ch;
    })
    .join("");
}

// Circled
function toCircled(text) {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
      return ch;
    })
    .join("");
}

// Math bold
function toMathBold(text) {
  return Array.from(text)
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
      if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + (code - 48));
      return ch;
    })
    .join("");
}

// Reverse
function toReverse(text) {
  return Array.from(text).reverse().join("");
}

// Upside-down
const upsideDownMap = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "ʅ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ɹ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"Ɫ","8":"8","9":"6","0":"0",
  ".":"˙", ",":"'","?":"¿","!":"¡","\"":",,", "'":",","`":",","(":")", ")":"(",
  "[":"]", "]":"[","{":"}","}":"{","<":">",">":"<","_":"‾","&":"⅋"
};
function toUpsideDown(text) {
  return Array.from(text)
    .map(ch => (upsideDownMap[ch] ?? upsideDownMap[ch.toLowerCase()] ?? ch))
    .reverse()
    .join("");
}

// Zalgo
const zalgoUp = [0x030d,0x030e,0x0304,0x0305,0x033f,0x0311,0x0306,0x0310,0x0352,0x0357];
function toZalgo(text, intensity = 3) {
  return Array.from(text).map(ch => {
    if (ch === " ") return ch;
    let out = ch;
    for (let i = 0; i < intensity; i++) {
      const cp = zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
      out += String.fromCodePoint(cp);
    }
    return out;
  }).join("");
}

// Small caps
const smallCapsMap = {
  a: "ᴀ", b: "ʙ", c: "ᴄ", d: "ᴅ", e: "ᴇ", f: "ꜰ", g: "ɢ", h: "ʜ",
  i: "ɪ", j: "ᴊ", k: "ᴋ", l: "ʟ", m: "ᴍ", n: "ɴ", o: "ᴏ", p: "ᴘ",
  q: "ǫ", r: "ʀ", s: "s", t: "ᴛ", u: "ᴜ", v: "ᴠ", w: "ᴡ", x: "x", y: "ʏ", z: "ᴢ"
};
function toSmallCaps(text) {
  return Array.from(text).map(c => smallCapsMap[c.toLowerCase()] ?? c).join("");
}

// Superscript
const superMap = {
  "0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹",
  "+":"⁺","-":"⁻","=":"⁼","(": "⁽", ")":"⁾","n":"ⁿ"
};
function toSuperscript(text) {
  return Array.from(text).map(ch => superMap[ch] ?? superMap[ch.toLowerCase()] ?? ch).join("");
}

// Subscript
const subMap = {
  "0":"₀","1":"₁","2":"₂","3":"₃","4":"₄","5":"₅","6":"₆","7":"₇","8":"₈","9":"₉",
  "+":"₊","-":"₋","=":"₌","(": "₍", ")":"₎","a":"ₐ","e":"ₑ","o":"ₒ","x":"ₓ"
};
function toSubscript(text) {
  return Array.from(text).map(ch => subMap[ch] ?? subMap[ch.toLowerCase()] ?? ch).join("");
}

// Wave
function toWave(text) {
  return Array.from(text).map((ch, i) => {
    if (!/[a-zA-Z]/.test(ch)) return ch;
    return i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
  }).join("");
}

// Spaced
function toSpaced(text, sep = " ") {
  return Array.from(text).join(sep);
}

// Overline (combining)
function toOverline(text) {
  const comb = String.fromCodePoint(0x0305);
  return Array.from(text).map(ch => ch === " " ? ch : ch + comb).join("");
}

// Underline (combining)
function toUnderline(text) {
  const comb = String.fromCodePoint(0x0332);
  return Array.from(text).map(ch => ch === " " ? ch : ch + comb).join("");
}

// Boxed
function toBoxed(text) {
  const lines = String(text).split("\n");
  const width = Math.max(...lines.map(l => Array.from(l).length));
  const h = "─".repeat(width + 2);
  const top = `┌${h}┐`;
  const bottom = `└${h}┘`;
  const mid = lines.map(l => {
    const pad = width - Array.from(l).length;
    return `│ ${l}${" ".repeat(pad)} │`;
  }).join("\n");
  return `${top}\n${mid}\n${bottom}`;
}

/* ============================
   Styles registry
   ============================ */

const STYLES = [
  { id: "fullwidth", name: "Fullwidth", fn: toFullwidth },
  { id: "circled", name: "Circled", fn: toCircled },
  { id: "mathbold", name: "Math bold", fn: toMathBold },
  { id: "smallcaps", name: "Small caps", fn: toSmallCaps },
  { id: "reverse", name: "Reverse", fn: toReverse },
  { id: "upside", name: "Upside-down", fn: toUpsideDown },
  { id: "zalgo", name: "Zalgo", fn: (t) => toZalgo(t, 3) },
  { id: "sup", name: "Superscript", fn: toSuperscript },
  { id: "sub", name: "Subscript", fn: toSubscript },
  { id: "wave", name: "Wave", fn: toWave },
  { id: "spaced", name: "Spaced", fn: toSpaced },
  { id: "over", name: "Overline", fn: toOverline },
  { id: "under", name: "Underline", fn: toUnderline },
  { id: "boxed", name: "Boxed", fn: toBoxed }
];

/* ============================
   Main component
   ============================ */

export default function Main() {
  const [openMenu, setOpenMenu] = useState(null); // { kind: 'output'|'fav', idx } or null
  const [text, setText] = useState("");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fontify:favs") || "[]"); } catch { return []; }
  });
  const [copiedIndex, setCopiedIndex] = useState(null); // number or 'orig'|'all'|'fav-X'
  const containerRef = useRef(null);

  // Derived outputs from STYLES (memoized)
  const outputs = useMemo(() => {
    return STYLES.map((s) => {
      try {
        return s.fn(text || "Your text preview");
      } catch {
        return text || "Your text preview";
      }
    });
  }, [text]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("fontify:favs", JSON.stringify(favorites));
  }, [favorites]);

  // Close menu when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Copied badge timeout
  useEffect(() => {
    if (copiedIndex === null) return;
    const t = setTimeout(() => setCopiedIndex(null), 1400);
    return () => clearTimeout(t);
  }, [copiedIndex]);

  // Unified copy function with fallback
  const copyToClipboard = async (value, idxKey) => {
    const toCopy = String(value);
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopiedIndex(idxKey);
    } catch (e) {
      // fallback method
      const ta = document.createElement("textarea");
      ta.value = toCopy;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopiedIndex(idxKey);
      } catch {
        alert("Clipboard blocked — please copy manually.");
      } finally {
        document.body.removeChild(ta);
      }
    } finally {
      setOpenMenu(null);
    }
  };

  // Bookmark / favorites
  const bookmark = (value) => {
    if (!value) return;
    setFavorites((prev) => {
      if (prev.includes(value)) return prev;
      const next = [value, ...prev].slice(0, 50);
      return next;
    });
    setOpenMenu(null);
  };

  // Toggle menu (for outputs and favorites)
  const toggleMenu = (kind, idx) => {
    if (openMenu && openMenu.kind === kind && openMenu.idx === idx) setOpenMenu(null);
    else setOpenMenu({ kind, idx });
  };

  // Remove favorite
  const removeFavorite = (val) => {
    setFavorites((prev) => prev.filter((x) => x !== val));
    setOpenMenu(null);
  };

  // Copy original / copy all handlers
  const handleCopyOriginal = async () => {
    if (!text) return;
    await copyToClipboard(text, "orig");
  };
  const handleCopyAll = async () => {
    const all = STYLES.map((s, i) => `${s.name}:\n${outputs[i]}`).join("\n\n");
    await copyToClipboard(all, "all");
  };

  // Helper for truncation in favorites preview
  const truncate = (str, n = 80) => {
    if (typeof str !== "string") return str;
    return str.length > n ? str.slice(0, n) + "…" : str;
  };

  return (
    <motion.div
      ref={containerRef}
      
      className="min-h-screen bg-black flex items-start justify-center py-6 px-4 mt-32"
    >
      <div className="w-full max-w-xl">
        {/* Text input */}
        <motion.textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          className="
            w-full
            bg-[#262626] text-gray-200 placeholder:text-gray-400
            rounded-[9px]
            p-4
            h-40
            resize-none
            text-base
            box-border
            focus:outline-none
            shadow-sm
          "
          aria-label="Text to convert"
          whileFocus={{ scale: 1.01 }}
        />

        {/* small control row */}
        <motion.div className="flex items-center justify-between mt-3 gap-3" layout>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyOriginal}
              className="px-3 py-2 bg-[#333333] text-gray-100 rounded-[9px] text-sm"
              title="Copy original text"
            >
              {copiedIndex === "orig" ? "Copied ✓" : "Copy Original"}
            </button>

            <button
              onClick={handleCopyAll}
              className="px-3 py-2 bg-[#2b2b2b] text-gray-100 rounded-[9px] text-sm"
              title="Copy all converted styles"
            >
              {copiedIndex === "all" ? "Copied All ✓" : "Copy All"}
            </button>
          </div>

          <div className="text-xs text-gray-400">
            Bookmarks: <span className="text-gray-200">{favorites.length}</span>
          </div>
        </motion.div>

        {/* Outputs list */}
        <div className="mt-4 space-y-3">
          <AnimatePresence>
            {outputs.map((val, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="relative"
              >
                <div
                  className="
                    flex items-center justify-between
                    bg-[#2b2b2b] text-gray-100
                    rounded-[9px]
                    px-4 py-3
                    shadow-sm
                  "
                >
                  <div className="text-sm leading-5 break-words">
                    {/* show boxed in a pre to preserve lines */}
                    {STYLES[i].id === "boxed" ? (
                      <pre className="m-0 whitespace-pre-wrap text-sm leading-5">{val}</pre>
                    ) : (
                      <div className="text-sm">{val}</div>
                    )}
                  </div>

                  <div className="relative flex items-center gap-2">
                    {/* copied badge */}
                    {copiedIndex === i && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 700, damping: 30 }}
                        className="text-xs bg-[#097C87] text-white px-2 py-1 rounded-full mr-1"
                      >
                        Copied ✓
                      </motion.div>
                    )}

                    {/* kebab button */}
                    <button
                      onClick={() => toggleMenu("output", i)}
                      aria-expanded={openMenu && openMenu.kind === "output" && openMenu.idx === i}
                      className="p-2 rounded-full hover:bg-white/5 active:bg-white/8"
                      title="Open menu"
                    >
                      <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                        <circle cx="2" cy="2" r="2" fill="#D1D5DB" />
                        <circle cx="2" cy="8" r="2" fill="#D1D5DB" />
                        <circle cx="2" cy="14" r="2" fill="#D1D5DB" />
                      </svg>
                    </button>

                    {/* popup menu */}
                    <AnimatePresence>
                      {openMenu && openMenu.kind === "output" && openMenu.idx === i && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-full mt-2 transform translate-y-0 z-30"
                        >
                          <div className="bg-[#313131] rounded-md shadow-lg py-2 min-w-[160px]">
                            <button
                              onClick={() => copyToClipboard(val, i)}
                              className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5"
                              title="Copy converted text"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 1H4a2 2 0 0 0-2 2v12" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <rect x="8" y="5" width="13" height="13" rx="2" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-sm text-gray-100">Copy text</span>
                            </button>

                            <button
                              onClick={() => bookmark(val)}
                              className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5"
                              title="Bookmark this output"
                            >
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 2h10a2 2 0 0 1 2 2v18l-7-4-7 4V4a2 2 0 0 1 2-2z" stroke="#E5E7EB" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span className="text-sm text-gray-100">Bookmark</span>
                            </button>

                            <button
                              onClick={() => {
                                try {
                                  const plain = val.normalize ? val.normalize("NFKD").replace(/[\u0300-\u036f]/g, "") : val;
                                  copyToClipboard(plain, `${i}-plain`);
                                } catch {
                                  copyToClipboard(val, `${i}-plain`);
                                }
                              }}
                              className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5"
                              title="Copy a plain (ASCII-friendly) version"
                            >
                              <span className="text-sm text-gray-100">Copy plain</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Favorites preview */}
        <div className="mt-6">
          <h4 className="text-sm text-gray-400 mb-2">Bookmarks</h4>

          {favorites.length === 0 ? (
            <div className="text-xs text-gray-500">No bookmarks yet — bookmark outputs from the menu.</div>
          ) : (
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {favorites.map((f, idx) => (
                  <motion.div
                    key={f + idx}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                    className="relative"
                  >
                    <div
                      className="
                        flex items-center justify-between
                        bg-[#2b2b2b] text-gray-100
                        rounded-[9px]
                        px-4 py-3
                        shadow-sm
                      "
                    >
                      <div className="text-sm leading-5 break-words truncate max-w-[72%]">{truncate(f, 120)}</div>

                      <div className="relative flex items-center gap-2">
                        {/* copied badge */}
                        {copiedIndex === `fav-${idx}` && (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 700, damping: 30 }}
                            className="text-xs bg-[#097C87] text-white px-2 py-1 rounded-full mr-1"
                          >
                            Copied ✓
                          </motion.div>
                        )}

                        <button
                          onClick={() => toggleMenu("fav", idx)}
                          aria-expanded={openMenu && openMenu.kind === "fav" && openMenu.idx === idx}
                          className="p-2 rounded-full hover:bg-white/5 active:bg-white/8"
                          title="Open bookmark menu"
                        >
                          <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="block">
                            <circle cx="2" cy="2" r="2" fill="#D1D5DB" />
                            <circle cx="2" cy="8" r="2" fill="#D1D5DB" />
                            <circle cx="2" cy="14" r="2" fill="#D1D5DB" />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {openMenu && openMenu.kind === "fav" && openMenu.idx === idx && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18 }}
                              className="absolute right-0 top-full mt-2 transform translate-y-0 z-30"
                            >
                              <div className="bg-[#313131] rounded-md shadow-lg py-2 min-w-[160px]">
                                <button
                                  onClick={() => copyToClipboard(f, `fav-${idx}`)}
                                  className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5"
                                >
                                  <span className="text-sm text-gray-100">Copy</span>
                                </button>

                                <button
                                  onClick={() => removeFavorite(f)}
                                  className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5"
                                >
                                  <span className="text-sm text-gray-100">Remove</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
