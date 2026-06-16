import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const REVIEWS = [
  {
    name: "Marcus K.",
    role: "Unternehmer",
    city: "Frankfurt",
    stars: 5,
    text: "Absolut beeindruckend. Das ist kein normaler Friseur – das ist ein Erlebnis. Amir hat meinen Look komplett transformiert. Die Atmosphäre, die Präzision, die Freundlichkeit – einfach Top-Klasse.",
    style: "Skin Fade + Bartpflege",
  },
  {
    name: "David S.",
    role: "Creative Director",
    city: "Berlin",
    stars: 5,
    text: "Ich habe viele Barbershops ausprobiert, aber keiner kommt auch nur annähernd an Amir heran. Das Ergebnis ist immer perfekt, die Beratung ehrlich und das Preis-Leistungs-Verhältnis unschlagbar.",
    style: "Premium Styling",
  },
  {
    name: "Jonas M.",
    role: "Architekt",
    city: "München",
    stars: 5,
    text: "Ein Ort, an dem Qualität wirklich spürbar ist. Von der Begrüßung bis zum fertigen Style – alles stimmt. Mein Vertrauen liegt hier in den besten Händen.",
    style: "Herrenhaarschnitt",
  },
  {
    name: "Luca R.",
    role: "Finanzberater",
    city: "Hamburg",
    stars: 5,
    text: "Endlich ein Barbershop, der meinen Ansprüchen gerecht wird. Professionell, modern und mit echtem Gespür für den jeweiligen Stil. Hier komme ich immer wieder.",
    style: "Komplettpaket",
  },
  {
    name: "Felix B.",
    role: "Software-Entwickler",
    city: "Stuttgart",
    stars: 5,
    text: "Was mich am meisten beeindruckt: die Liebe zum Detail. Jede Kleinigkeit wird perfektioniert. Das ist echter Handwerker-Stolz, den man heute so selten findet.",
    style: "Fade + Styling",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-[#c9a227] text-xs">★</span>
      ))}
    </div>
  )
}

const ReviewsSection: React.FC = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const sectionRef = useRef<HTMLElement>(null)

  const go = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  const next = useCallback(() => {
    const idx = (current + 1) % REVIEWS.length
    setDirection(1)
    setCurrent(idx)
  }, [current])

  const prev = useCallback(() => {
    const idx = (current - 1 + REVIEWS.length) % REVIEWS.length
    setDirection(-1)
    setCurrent(idx)
  }, [current])

  useEffect(() => {
    intervalRef.current = setInterval(next, 5500)
    return () => clearInterval(intervalRef.current)
  }, [next])

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      gsap.from(".reviews-heading", {
        opacity: 0, y: 40, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      })
    })()
  }, [])

  const review = REVIEWS[current]

  const variants = {
    enter: (dir: number) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -80, opacity: 0 }),
  }

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#0d0a05] overflow-hidden"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/35 to-transparent" />
      {/* Glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#c9a227] opacity-[0.055] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#c9a227] opacity-[0.03] blur-[160px] pointer-events-none" />

      <div className="container-luxury">
        {/* Header */}
        <div className="reviews-heading text-center mb-20">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Kundenstimmen
          </p>
          <h2
            className="font-display font-light text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Was unsere Kunden{" "}
            <em className="not-italic text-gradient-gold">sagen</em>
          </h2>
        </div>

        {/* Main review */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass-strong rounded-sm p-10 md:p-14 relative overflow-hidden"
            >
              {/* Quote mark */}
              <span className="absolute top-6 left-8 font-display text-[8rem] leading-none text-white/[0.04] select-none pointer-events-none">
                "
              </span>

              {/* Stars + style tag */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
                <Stars count={review.stars} />
                <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#00d4ff] border border-[#00d4ff]/25 px-3 py-1">
                  {review.style}
                </span>
              </div>

              {/* Text */}
              <p className="relative z-10 text-white/70 font-light text-base md:text-lg leading-relaxed mb-10 font-display italic">
                „{review.text}"
              </p>

              {/* Author */}
              <div className="relative z-10 flex items-center gap-4 pt-8 border-t border-white/[0.06]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "linear-gradient(135deg, #00d4ff22, #c9a22722)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}
                >
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{review.name}</p>
                  <p className="text-white/35 text-xs">{review.role} · {review.city}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:block">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-300"
              aria-label="Vorherige Bewertung"
            >
              ←
            </button>
          </div>
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:block">
            <button
              onClick={next}
              className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-300"
              aria-label="Nächste Bewertung"
            >
              →
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all duration-300"
              aria-label={`Bewertung ${i + 1}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background: i === current ? "#00d4ff" : "rgba(255,255,255,0.15)",
                }}
              />
            </button>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          {[
            { value: "5.0", label: "Google Rating" },
            { value: "500+", label: "Bewertungen" },
            { value: "100%", label: "Empfehlen uns" },
          ].map(s => (
            <div key={s.label}>
              <p className="font-display text-3xl text-white mb-1">{s.value}</p>
              <p className="text-white/30 text-xs tracking-wider uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
