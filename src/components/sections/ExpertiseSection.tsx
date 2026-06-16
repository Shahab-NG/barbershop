import React, { useEffect, useRef, useState } from "react"

interface Stat {
  value: number
  suffix: string
  label: string
  desc: string
}

const STATS: Stat[] = [
  { value: 7, suffix: "+", label: "Jahre Erfahrung", desc: "Handwerk, das sich beweist" },
  { value: 5000, suffix: "+", label: "Zufriedene Kunden", desc: "Vertrauen, das wächst" },
  { value: 98, suffix: "%", label: "Kundenzufriedenheit", desc: "Qualität, die überzeugt" },
  { value: 15, suffix: "+", label: "Signature Styles", desc: "Kreativität ohne Grenzen" },
]

const SKILLS = [
  { label: "Präzisionsschnitt", value: 98 },
  { label: "Bartpflege & Rasur", value: 95 },
  { label: "Fade & Blending", value: 99 },
  { label: "Premium Styling", value: 92 },
  { label: "Haarpflege-Behandlung", value: 88 },
]

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])

  return count
}

const StatCard: React.FC<{ stat: Stat; active: boolean }> = ({ stat, active }) => {
  const count = useCountUp(stat.value, active)
  return (
    <div className="expertise-stat text-center group">
      <div className="relative inline-block mb-4">
        <span
          className="font-display font-light leading-none block"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#00d4ff" }}
        >
          {count.toLocaleString("de-DE")}{stat.suffix}
        </span>
        {/* Underline accent */}
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/40 to-transparent" />
      </div>
      <p className="text-white font-medium text-sm tracking-wide mb-1">{stat.label}</p>
      <p className="text-white/30 text-xs">{stat.desc}</p>
    </div>
  )
}

const ExpertiseSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [statsActive, setStatsActive] = useState(false)
  const barsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        /* Heading */
        gsap.from(".exp-heading", {
          opacity: 0, y: 40, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })

        /* Stats trigger */
        ScrollTrigger.create({
          trigger: ".exp-stats",
          start: "top 80%",
          onEnter: () => setStatsActive(true),
        })

        /* Stats stagger */
        gsap.from(".expertise-stat", {
          opacity: 0, y: 50, stagger: 0.15, duration: 0.9,
          scrollTrigger: { trigger: ".exp-stats", start: "top 80%" },
        })

        /* Skill bars */
        barsRef.current.forEach((bar, i) => {
          if (!bar) return
          const target = SKILLS[i].value
          gsap.fromTo(bar,
            { width: "0%" },
            {
              width: `${target}%`,
              duration: 1.4,
              delay: i * 0.12,
              ease: "power3.out",
              scrollTrigger: { trigger: ".exp-skills", start: "top 80%" },
            }
          )
        })

        /* Skills section */
        gsap.from(".exp-skill-row", {
          opacity: 0, x: -30, stagger: 0.1, duration: 0.8,
          scrollTrigger: { trigger: ".exp-skills", start: "top 80%" },
        })
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#050505] overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <div className="exp-heading text-center mb-20">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Expertise
          </p>
          <h2
            className="font-display font-light text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Jahrelange{" "}
            <em className="not-italic text-gradient-gold">Meisterschaft</em>
          </h2>
        </div>

        {/* Stats */}
        <div className="exp-stats grid grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          {STATS.map(stat => (
            <StatCard key={stat.label} stat={stat} active={statsActive} />
          ))}
        </div>

        {/* Skills */}
        <div className="exp-skills grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Bars */}
          <div className="space-y-8">
            {SKILLS.map((skill, i) => (
              <div key={skill.label} className="exp-skill-row">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/70 text-sm">{skill.label}</span>
                  <span className="text-[#00d4ff] text-xs font-medium">{skill.value}%</span>
                </div>
                <div className="h-px bg-white/[0.06] relative overflow-hidden">
                  <div
                    ref={el => { barsRef.current[i] = el }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#00d4ff] to-[#0066ff]"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: Narrative */}
          <div className="lg:pl-12">
            <div className="border-l border-[#00d4ff]/20 pl-8 space-y-6">
              <blockquote>
                <p className="font-display font-light text-white/80 text-xl md:text-2xl leading-relaxed italic">
                  „Jeder Schnitt erzählt eine Geschichte. Unsere Aufgabe ist es, die
                  beste Version dieser Geschichte zu erzählen."
                </p>
                <footer className="mt-6">
                  <p className="text-[#c9a227] text-sm font-medium">— Amir</p>
                  <p className="text-white/25 text-xs tracking-wider uppercase mt-1">Gründer & Chefbarber</p>
                </footer>
              </blockquote>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {[
                { icon: "✦", label: "Zertifiziert", desc: "EU-Meisterbrief" },
                { icon: "◈", label: "International", desc: "Weltweit geschult" },
                { icon: "◇", label: "Premium", desc: "Top-Produkte" },
                { icon: "⟁", label: "Innovativ", desc: "Neueste Trends" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-[#00d4ff] text-base mt-0.5">{item.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{item.label}</p>
                    <p className="text-white/30 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection
