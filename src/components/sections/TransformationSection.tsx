import React from "react"
import ScrollExpandMedia from "../ui/ScrollExpandMedia"

const SERVICES_AFTER_EXPAND = [
  { icon: "✦", title: "Precision Fade", desc: "Makellose Übergänge, die deinen Look definieren." },
  { icon: "◈", title: "Signature Cut", desc: "Handwerk auf höchstem Niveau — jeder Schnitt einzigartig." },
  { icon: "◇", title: "Beard Sculpt", desc: "Dein Bart, perfekt geformt und gepflegt." },
]

const TransformationSection: React.FC = () => {
  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="/images/vid.mp4"
      posterSrc="/images/barber-08.jpg"
      bgImageSrc="/images/Fresha.avif"
      title="Die Transformation"
      subtitle="Erlebe den Unterschied"
      scrollToExpand="Scrollen zum Entfalten"
    >
      {/* Content revealed after full expansion */}
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
            Das Ergebnis
          </p>
          <h2
            className="font-display font-light text-white leading-tight mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Mehr als ein Haarschnitt —{" "}
            <em className="not-italic text-gradient-gold">ein Erlebnis.</em>
          </h2>
          <p className="text-white/40 text-base leading-relaxed max-w-2xl mx-auto">
            Bei Amir Barbershop ist jeder Besuch eine Reise. Von der ersten Beratung
            bis zum finalen Style — wir liefern Perfektion, die man spürt.
          </p>
        </div>

        {/* 3-column feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SERVICES_AFTER_EXPAND.map(s => (
            <div
              key={s.title}
              className="glass p-8 text-center relative overflow-hidden group hover:border-[#00d4ff]/20 transition-colors duration-300"
            >
              <span className="text-[#00d4ff] text-2xl mb-5 block">{s.icon}</span>
              <h3 className="text-white font-medium text-base mb-2">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#booking"
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#00d4ff] text-[#050505] text-[0.7rem] font-bold tracking-[0.3em] uppercase hover:bg-white hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300"
          >
            Termin buchen
            <span className="text-base">→</span>
          </a>
        </div>

      </div>
    </ScrollExpandMedia>
  )
}

export default TransformationSection
