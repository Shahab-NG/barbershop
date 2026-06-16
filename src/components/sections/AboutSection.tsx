import React, { useEffect, useRef } from "react"

const PILLARS = [
  { label: "Tradition", desc: "Jahrzehnte handwerklicher Meisterschaft" },
  { label: "Innovation", desc: "Modernste Techniken und Trends" },
  { label: "Luxus", desc: "Erstklassige Produkte & Atmosphäre" },
]

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        /* Parallax on the image panel */
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })

        /* Text reveal */
        gsap.from(".about-line", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 75%",
          },
        })

        /* Pillars */
        gsap.from(".about-pillar", {
          opacity: 0,
          y: 30,
          stagger: 0.12,
          duration: 0.9,
          scrollTrigger: {
            trigger: ".about-pillars",
            start: "top 80%",
          },
        })
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#050505] overflow-hidden"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-[600px] h-[600px] rounded-full bg-[#00d4ff] opacity-[0.06] blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#c9a227] opacity-[0.05] blur-[130px] pointer-events-none" />

      <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* ── Left: Text ── */}
        <div className="about-text order-2 lg:order-1">
          <p className="about-line text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-7">
            Über Uns
          </p>

          <h2
            className="about-line font-display font-light text-white leading-[0.9] mb-8"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            Wo Handwerk<br />
            <em className="not-italic text-gradient-gold">Kunst wird.</em>
          </h2>

          <p className="about-line text-white/40 font-light text-base md:text-lg leading-relaxed mb-6">
            Amir Barbershop ist mehr als ein Friseur – es ist ein Erlebnis. Gegründet
            mit der Vision, Premium-Grooming und modernste Barberkunst unter einem Dach
            zu vereinen.
          </p>

          <p className="about-line text-white/30 font-light text-sm leading-relaxed mb-12">
            Jeder Besuch bei uns ist ein Moment der Stille, der Präzision und des Stils.
            Wir glauben daran, dass ein guter Haarschnitt nicht nur das Aussehen,
            sondern das gesamte Selbstbewusstsein eines Mannes verändert.
          </p>

          {/* Pillars */}
          <div className="about-pillars grid grid-cols-3 gap-6">
            {PILLARS.map(p => (
              <div key={p.label} className="about-pillar">
                <div className="w-6 h-px bg-[#00d4ff] mb-4" />
                <p className="text-white font-medium text-sm mb-1">{p.label}</p>
                <p className="text-white/30 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href="#booking"
              className="inline-flex items-center gap-3 text-[0.7rem] tracking-[0.25em] uppercase font-semibold text-white hover:text-[#00d4ff] transition-colors duration-300 group"
            >
              <span>Termin vereinbaren</span>
              <span className="w-8 h-px bg-white group-hover:bg-[#00d4ff] group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>

        {/* ── Right: Image panel ── */}
        <div className="order-1 lg:order-2 relative h-[480px] lg:h-[640px] overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            {/* Real photo */}
            <img
              src="/images/barber-07.jpg"
              alt="Amir Barbershop"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Corner accents */}
          <span className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#00d4ff]/40 z-10 pointer-events-none" />
          <span className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#00d4ff]/40 z-10 pointer-events-none" />
          <span className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#00d4ff]/40 z-10 pointer-events-none" />
          <span className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#00d4ff]/40 z-10 pointer-events-none" />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]/20 pointer-events-none" />

          {/* Badge */}
          <div className="absolute bottom-8 left-8 glass px-5 py-3 z-10">
            <p className="text-white/30 text-[0.6rem] tracking-widest uppercase mb-1">Gegründet</p>
            <p className="text-white font-display text-xl">2018</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
