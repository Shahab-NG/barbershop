import React, { useEffect, useRef } from "react"

const CONTACT_INFO = [
  {
    icon: "◈",
    label: "Adresse",
    lines: ["Musterstraße 42", "60329 Frankfurt am Main"],
  },
  {
    icon: "✦",
    label: "Telefon",
    lines: ["+49 150 1234 5678"],
    href: "tel:+4915012345678",
  },
  {
    icon: "◇",
    label: "E-Mail",
    lines: ["info@amir-barbershop.de"],
    href: "mailto:info@amir-barbershop.de",
  },
  {
    icon: "⟁",
    label: "Öffnungszeiten",
    lines: ["Montag – Freitag: 9 – 20 Uhr", "Samstag: 9 – 18 Uhr", "Sonntag: Geschlossen"],
  },
]

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "Facebook", href: "#" },
]

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.from(".contact-heading", {
          opacity: 0, y: 40, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })
        gsap.from(".contact-card", {
          opacity: 0, y: 30, stagger: 0.1, duration: 0.8,
          scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
        })
        gsap.from(".contact-map", {
          opacity: 0, scale: 0.98, duration: 1.2,
          scrollTrigger: { trigger: ".contact-map", start: "top 85%" },
        })
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-44 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/15 to-transparent" />

      <div className="container-luxury">
        {/* Header */}
        <div className="contact-heading text-center mb-20">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Kontakt & Anfahrt
          </p>
          <h2
            className="font-display font-light text-white leading-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Finde uns{" "}
            <em className="not-italic text-gradient-gold">in Frankfurt</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div>
            <div className="contact-grid grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {CONTACT_INFO.map(info => (
                <div
                  key={info.label}
                  className="contact-card glass p-7 relative overflow-hidden group hover:border-[#00d4ff]/15 transition-colors duration-300"
                >
                  {/* Corner accent */}
                  <span className="absolute top-3 right-3 text-[#00d4ff]/20 text-xs group-hover:text-[#00d4ff]/40 transition-colors">{info.icon}</span>

                  <p className="text-[#00d4ff] text-[0.6rem] tracking-[0.4em] uppercase mb-3">
                    {info.label}
                  </p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="block text-white/60 text-sm leading-relaxed hover:text-white transition-colors duration-300"
                    >
                      {info.lines.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </a>
                  ) : (
                    <div className="text-white/60 text-sm leading-relaxed">
                      {info.lines.map((line, i) => (
                        <span key={i} className="block">{line}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="text-white/25 text-[0.6rem] tracking-[0.4em] uppercase mb-5">
                Folge uns
              </p>
              <div className="flex items-center gap-6">
                {SOCIALS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="text-white/30 text-sm hover:text-[#00d4ff] transition-colors duration-300 relative group"
                  >
                    {s.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#00d4ff] group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <a
                href="#booking"
                className="inline-flex items-center gap-4 px-8 py-4 bg-[#00d4ff] text-[#050505] text-[0.7rem] font-bold tracking-[0.25em] uppercase hover:bg-white hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-300"
              >
                Termin buchen
                <span className="text-base">→</span>
              </a>
            </div>
          </div>

          {/* Right: Map embed */}
          <div className="contact-map relative">
            <div className="relative overflow-hidden border border-white/[0.05]" style={{ height: "480px" }}>
              {/* Corner accents */}
              <span className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00d4ff]/30 z-10 pointer-events-none" />
              <span className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00d4ff]/30 z-10 pointer-events-none" />
              <span className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00d4ff]/30 z-10 pointer-events-none" />
              <span className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00d4ff]/30 z-10 pointer-events-none" />

              <iframe
                title="Amir Barbershop Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5!2d8.6816!3d50.1109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA2JzM5LjIiTiA4wrA0MCc1My43IkU!5e0!3m2!1sde!2sde!4v1"
                className="w-full h-full border-0 grayscale contrast-125 brightness-50"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Info overlay */}
            <div className="absolute bottom-6 left-6 right-6 glass-strong px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white text-sm font-medium">Amir Barbershop</p>
                <p className="text-white/35 text-xs">Musterstraße 42, Frankfurt</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00d4ff] text-xs tracking-wider uppercase hover:text-white transition-colors flex items-center gap-2"
              >
                Route <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
