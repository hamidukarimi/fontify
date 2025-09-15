import Header from "../Header"


// src/App.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import Main from "../main/Main";

/* ============================
   Helper transforms (all in-file)
   ============================ */

// Fullwidth
function toFullwidth(text) {
  return Array.from(text).map((ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xff01 - 33);
    return ch;
  }).join("");
}

// Circled
function toCircled(text) {
  return Array.from(text).map((ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24b6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24d0 + (code - 97));
    return ch;
  }).join("");
}

// Math Bold
function toMathBold(text) {
  return Array.from(text).map((ch) => {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + (code - 48));
    return ch;
  }).join("");
}

// Reverse
function toReverse(text) {
  return Array.from(text).reverse().join("");
}

// Upside Down
const upsideDownMap = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ",
  k: "ʞ", l: "ʅ", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ",
  u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "פ", H: "H", I: "I", J: "ſ",
  K: "ʞ", L: "˥", M: "W", N: "N", O: "O", P: "Ԁ", Q: "Q", R: "ɹ", S: "S", T: "┴",
  U: "∩", V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  "1":"Ɩ","2":"ᄅ","3":"Ɛ","4":"ㄣ","5":"ϛ","6":"9","7":"Ɫ","8":"8","9":"6","0":"0",
  ".":"˙", ",":"'","?":"¿","!":"¡","\"":",,", "'":",","`":",","(":")",")":"(",
  "[":"]","]":"[","{":"}","}":"{","<":">",">":"<","_":"‾","&":"⅋"
};
function toUpsideDown(text) {
  return Array.from(text)
    .map(ch => (upsideDownMap[ch] ?? upsideDownMap[ch.toLowerCase()] ?? ch))
    .reverse()
    .join("");
}

// Zalgo (combining marks)
const zalgoUp = [0x030d,0x030e,0x0304,0x0305,0x033f,0x0311,0x0306,0x0310,0x0352,0x0357,0x0351,0x0307,0x0308,0x030a];
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

// Small Caps
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

// Wave (alternating caps)
function toWave(text) {
  return Array.from(text).map((ch, i) => {
    if (!/[a-zA-Z]/.test(ch)) return ch;
    return i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
  }).join("");
}

// Spaced out (letter-spacing)
function toSpaced(text, sep = " ") {
  return Array.from(text).join(sep);
}

// Overline (combining U+0305)
function toOverline(text) {
  const comb = String.fromCodePoint(0x0305);
  return Array.from(text).map(ch => ch === " " ? ch : ch + comb).join("");
}

// Underline (combining U+0332)
function toUnderline(text) {
  const comb = String.fromCodePoint(0x0332);
  return Array.from(text).map(ch => ch === " " ? ch : ch + comb).join("");
}

// Boxed: draws a simple box around the text using box-drawing characters
function toBoxed(text) {
  // split into lines to handle multi-line
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
   STYLES registry (extended)
   ============================ */

const STYLES = [
  { id: "fullwidth", name: "Fullwidth", fn: toFullwidth, desc: "Wide Unicode block characters" },
  { id: "circled", name: "Circled", fn: toCircled, desc: "Letters inside circles (where available)" },
  { id: "mathbold", name: "Math Bold", fn: toMathBold, desc: "Mathematical bold characters (Unicode block)" },
  { id: "smallcaps", name: "Small Caps", fn: toSmallCaps, desc: "Small capital letters" },
  { id: "reverse", name: "Reverse", fn: toReverse, desc: "Reverse the string" },
  { id: "upside", name: "Upside-Down", fn: toUpsideDown, desc: "Rotated / flipped characters" },
  { id: "zalgo", name: "Zalgo", fn: (t) => toZalgo(t, 4), desc: "Combining diacritics glitch (fragile)" },
  { id: "sup", name: "Superscript", fn: toSuperscript, desc: "Superscript (numbers & symbols)" },
  { id: "sub", name: "Subscript", fn: toSubscript, desc: "Subscript (numbers & symbols)" },
  { id: "wave", name: "Wave", fn: toWave, desc: "Alternating caps for a wave effect" },
  { id: "spaced", name: "Spaced", fn: (t) => toSpaced(t, " "), desc: "Letter spacing (space between characters)" },
  { id: "over", name: "Overline", fn: toOverline, desc: "Add overline combining mark" },
  { id: "under", name: "Underline", fn: toUnderline, desc: "Add underline combining mark" },
  { id: "boxed", name: "Boxed", fn: toBoxed, desc: "Box-drawing around text (multi-line safe)" }
];

/* ============================
   React component (Phase 2)
   ============================ */


const Home = () => {

    const [input, setInput] = useState("Welcome to Fontify — type here!");
  const [copiedId, setCopiedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fontify:favs") || "[]"); } catch { return []; }
  });
  const [accessibilityMode, setAccessibilityMode] = useState(false);
  const textareaRef = useRef(null);

  // keep favorites saved
  useEffect(() => {
    localStorage.setItem("fontify:favs", JSON.stringify(favorites));
  }, [favorites]);

  // copy feedback timeout
  useEffect(() => {
    if (!copiedId) return;
    const t = setTimeout(() => setCopiedId(null), 1400);
    return () => clearTimeout(t);
  }, [copiedId]);

  // memoized converted outputs (recompute only when input changes)
  const convertedMap = useMemo(() => {
    const map = {};
    STYLES.forEach(s => {
      try {
        map[s.id] = s.fn(input);
      } catch {
        map[s.id] = input;
      }
    });
    return map;
  }, [input]);

  // copy text with graceful fallback
  async function copyText(text, styleId) {
    const toCopy = accessibilityMode ? input : text;
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopiedId(styleId);
    } catch (e) {
      // fallback: select & prompt
      setCopiedId(null);
      // create temporary textarea for manual select
      const ta = document.createElement("textarea");
      ta.value = toCopy;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopiedId(styleId);
      } catch {
        alert("Clipboard blocked — please select and copy manually.");
      } finally {
        document.body.removeChild(ta);
      }
    }
  }

  // copy all formatted
  async function copyAll() {
    const lines = STYLES.map(s => `${s.name}:\n${convertedMap[s.id]}`).join("\n\n");
    const toCopy = accessibilityMode ? input : lines;
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopiedId("all");
    } catch {
      alert("Clipboard blocked — try selecting the previews and copying manually.");
    }
  }

  function toggleFav(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  // Keyboard shortcuts:
  // - Ctrl/Cmd + Enter => copyAll
  // - Number keys 1..9/0 => copy corresponding style (ignores when textarea focused)
  useEffect(() => {
    function handler(e) {
      // ignore if typing in textarea (let user type)
      const active = document.activeElement;
      const isTyping = active && (active.tagName === "TEXTAREA" || active.tagName === "INPUT" || active.isContentEditable);
      if (isTyping) {
        // but allow Ctrl/Cmd+Enter even while typing
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          copyAll();
        }
        return;
      }
      // Ctrl/Cmd + Enter -> copy all
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        copyAll();
        return;
      }
      // numbers 1..9 and 0 -> copy nth style
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        const n = e.key === "0" ? 10 : parseInt(e.key, 10);
        if (n >= 1 && n <= STYLES.length) {
          const s = STYLES[n - 1];
          copyText(convertedMap[s.id], s.id);
        }
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [convertedMap, accessibilityMode, input]);

  // mobile: allow tapping preview panel to copy (onTouchStart)
  function onPreviewTap(s) {
    // single tap -> copy converted text
    copyText(convertedMap[s.id], s.id);
  }


  
  return (
    <>

    <Header />
    <Main />







     <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Fontify — Fancy Text Generator</h1>
          <p className="text-sm text-slate-600 mt-1">Convert text to unicode styles. Works in chats, bios, posts — test across apps.</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Input + controls */}
          <section className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-700 mb-2">Input</label>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              className="w-full p-3 rounded-lg border border-slate-200 resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Text input for Fontify"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => setInput("")} className="inline-flex items-center px-3 py-2 bg-red-500 text-white rounded-lg shadow-sm">Clear</button>
              <button onClick={() => { navigator.clipboard?.writeText(input); setCopiedId("orig"); }} className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg shadow-sm">Copy Original</button>
              <button onClick={copyAll} className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg shadow-sm">{copiedId === "all" ? "Copied All ✓" : "Copy All"}</button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={accessibilityMode} onChange={(e) => setAccessibilityMode(e.target.checked)} />
                <span>Accessibility mode (copy plain text)</span>
              </label>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-semibold">Favorites</h4>
              <div className="mt-2 flex gap-2 flex-wrap">
                {favorites.length === 0 && <div className="text-xs text-slate-500">No favorites yet — click the star on a style.</div>}
                {STYLES.filter(s => favorites.includes(s.id)).map(s => (
                  <button key={s.id} onClick={() => copyText(convertedMap[s.id], s.id)} className="px-2 py-1 bg-slate-100 rounded text-sm">{s.name}</button>
                ))}
              </div>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              <p><strong>Shortcuts:</strong> <code>Ctrl/Cmd + Enter</code> = Copy All. Press <code>1</code>.. <code>9</code> / <code>0</code> to copy that style.</p>
              <p className="mt-2">Tip: Turn on Accessibility mode if you paste into places used by screen readers or that strip unusual Unicode.</p>
            </div>
          </section>

          {/* Previews */}
          <section className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Previews & Copy</label>

            <div className="space-y-3">
              {STYLES.map((s, idx) => {
                const converted = convertedMap[s.id];
                const isCopied = copiedId === s.id;
                const isFav = favorites.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-white"
                    onTouchStart={() => onPreviewTap(s)}
                    role="group"
                    aria-label={`${s.name} preview`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{s.name} <span className="text-xs text-slate-400 ml-2">#{idx + 1}</span></h3>
                          <div className="text-xs text-slate-400">{s.desc}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleFav(s.id)}
                            title={isFav ? "Remove favorite" : "Add to favorites"}
                            className={`px-2 py-1 rounded ${isFav ? "text-yellow-500" : "text-slate-400"}`}
                            aria-pressed={isFav}
                          >
                            ★
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 p-3 rounded bg-slate-50 border border-slate-100 min-h-[56px] break-words">
                        <pre className="whitespace-pre-wrap text-lg leading-snug m-0" aria-hidden={accessibilityMode ? "false" : "true"}>{converted}</pre>
                      </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                      <button
                        onClick={() => copyText(converted, s.id)}
                        className={`px-3 py-1 text-sm rounded ${isCopied ? "bg-green-600 text-white" : "bg-green-600 text-white hover:opacity-90"}`}
                        aria-label={accessibilityMode ? `Copy plain text for ${s.name}` : `Copy ${s.name}`}
                      >
                        {isCopied ? "Copied ✓" : (accessibilityMode ? "Copy (plain)" : "Copy")}
                      </button>

                      <button
                        onClick={() => {
                          const w = window.open("", "_blank");
                          if (w) {
                            w.document.body.style.fontFamily = "system-ui, sans-serif";
                            w.document.body.style.padding = "20px";
                            w.document.body.innerText = converted;
                          } else {
                            alert("Popup blocked — allow popups for this site to use quick test.");
                          }
                        }}
                        className="px-3 py-1 text-sm border rounded text-slate-700"
                        title="Open quick window with the text"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-slate-500">
              <strong>Compatibility tip:</strong> test a style by pasting into the exact app (WhatsApp mobile, Instagram bio). Use Accessibility mode if you notice screen-reader issues.
            </div>
          </section>
        </main>
      </div>
    </div>







    
    
    </>
  )
}

export default Home