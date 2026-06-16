import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const SERVICES = [
  {
    id: "01",
    title: "Herrenhaarschnitt",
    sub: "Klassisch & Modern",
    desc: "Präzise Schnitte, die deinen Stil definieren. Von zeitlos-klassisch bis avantgardistisch modern – jeder Schnitt mit höchster Expertise ausgeführt.",
    price: "ab 35 €",
    duration: "45 min",
    icon: "✦",
    accent: "#00d4ff",
  },
  {
    id: "02",
    title: "Skin Fade",
    sub: "Präzisionsfade",
    desc: "Perfekte Übergänge vom Kurzen ins Lange. Unser Signature-Fade vereint technische Präzision mit zeitgemäßem Stil.",
    price: "ab 40 €",
    duration: "60 min",
    icon: "◈",
    accent: "#c9a227",
  },
  {
    id: "03",
    title: "Bartpflege",
    sub: "Gepflegt & Definiert",
    desc: "Formgebung, Rasur und Pflege – dein Bart in perfekter Form. Traditionelle Barbierkunst, neu interpretiert.",
    price: "ab 25 €",
    duration: "30 min",
    icon: "◇",
    accent: "#00d4ff",
  },
  {
    id: "04",
    title: "Premium Styling",
    sub: "Exklusives Treatment",
    desc: "Haarpflege auf höchstem Niveau. Erstklassige Produkte und individuelle Beratung für deinen perfekten Look.",
    price: "ab 60 €",
    duration: "90 min",
    icon: "⟁",
    accent: "#c9a227",
  },
  {
    id: "05",
    title: "Komplettpaket",
    sub: "Das volle Erlebnis",
    desc: "Haarschnitt, Bartpflege, Styling – das komplette Barbershop-Erlebnis für den anspruchsvollen Mann.",
    price: "ab 80 €",
    duration: "120 min",
    icon: "✦",
    accent: "#00d4ff",
  },
]

interface CardProps {
  service: (typeof SERVICES)[0]
  index: number
}

const ServiceCard: React.FC<CardProps> = ({ service }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      className="relative bg-[#161109] border border-white/[0.08] p-8 md:p-10 flex flex-col cursor-pointer group overflow-hidden"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ borderColor: "rgba(201,162,39,0.25)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: hovered
            ? `radial-gradient(ellipse at 40% 40%, ${service.accent}0d 0%, transparent 65%)`
            : "transparent",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Large ghost number */}
      <span
        className="absolute -top-3 -right-2 font-display text-[6rem] leading-none select-none pointer-events-none transition-colors duration-500"
        style={{ color: hovered ? `${service.accent}18` : "rgba(255,255,255,0.04)" }}
      >
        {service.id}
      </span>

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <span
          className="text-2xl mb-7 transition-colors duration-300"
          style={{ color: hovered ? service.accent : "rgba(255,255,255,0.3)" }}
        >
          {service.icon}
        </span>

        {/* Title */}
        <h3 className="font-display font-light text-[1.6rem] text-white mb-1 group-hover:text-white transition-colors">
          {service.title}
        </h3>
        <p
          className="text-[0.65rem] tracking-[0.35em] uppercase mb-5 transition-colors duration-300"
          style={{ color: service.accent }}
        >
          {service.sub}
        </p>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed flex-1">
          {service.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
          <div>
            <p className="text-white/25 text-[0.6rem] tracking-widest uppercase mb-1">Preis</p>
            <p className="text-white font-medium text-sm">{service.price}</p>
          </div>
          <div className="text-center">
            <p className="text-white/25 text-[0.6rem] tracking-widest uppercase mb-1">Dauer</p>
            <p className="text-white font-medium text-sm">{service.duration}</p>
          </div>
          <motion.div
            className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 text-xs"
            animate={{ borderColor: hovered ? `${service.accent}60` : "rgba(255,255,255,0.1)" }}
          >
            →
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.from(".svc-heading", {
          opacity: 0, y: 50, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })
        gsap.from(".svc-card", {
          opacity: 0, y: 70, stagger: 0.12, duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".svc-grid", start: "top 80%" },
        })
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-32 md:py-40 bg-[#0d0a05]">
      {/* Ambient warm glow */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/4 w-[600px] h-[600px] rounded-full bg-[#c9a227] opacity-[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[400px] rounded-full bg-[#c9a227] opacity-[0.03] blur-[120px] pointer-events-none" />
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/35 to-transparent" />

      <div className="container-luxury">
        {/* Header */}
        <div className="svc-heading text-center mb-20">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Unsere Leistungen
          </p>
          <h2
            className="font-display font-light text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Kunst trifft{" "}
            <em className="not-italic text-gradient-gold">Präzision</em>
          </h2>
          <div className="mt-6 flex justify-center">
            <p className="text-white/35 font-light max-w-lg text-sm md:text-base leading-relaxed">
              Jeder Service ist ein Erlebnis für sich – entwickelt für den modernen Mann,
              der das Beste erwartet und nichts weniger akzeptiert.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="svc-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a227]/[0.06]">
          {SERVICES.map((s, i) => (
            <div key={s.id} className="svc-card bg-[#0d0a05]">
              <ServiceCard service={s} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#booking"
            className="inline-flex items-center gap-4 text-[0.7rem] tracking-[0.3em] uppercase text-white/40 hover:text-[#00d4ff] transition-colors duration-300 group"
          >
            <span className="w-8 h-px bg-white/20 group-hover:bg-[#00d4ff] group-hover:w-12 transition-all duration-300" />
            Alle Services & Preise
            <span className="w-8 h-px bg-white/20 group-hover:bg-[#00d4ff] group-hover:w-12 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
