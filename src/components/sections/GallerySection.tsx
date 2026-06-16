import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

/* Gallery items – replace src with real images in production */
const ITEMS = [
  { id: 1, label: "Classic Fade", style: "Skin Fade", img: "/images/barber-01.jpg", accent: "#00d4ff" },
  { id: 2, label: "Executive Cut", style: "Premium Schnitt", img: "/images/barber-02.jpg", accent: "#c9a227" },
  { id: 3, label: "Textured Crop", style: "Modern Style", img: "/images/barber-03.jpg", accent: "#00d4ff" },
  { id: 4, label: "Beard Shaping", style: "Bartpflege", img: "/images/barber-04.jpg", accent: "#c9a227" },
  { id: 5, label: "French Crop", style: "Trend Style", img: "/images/barber-05.jpg", accent: "#00d4ff" },
  { id: 6, label: "Tapered Side", style: "Präzisionsschnitt", img: "/images/barber-06.jpg", accent: "#c9a227" },
]

const GallerySection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        gsap.from(".gallery-heading", {
          opacity: 0, y: 40, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })
        gsap.from(trackRef.current, {
          opacity: 0, x: 60, duration: 1.2,
          scrollTrigger: { trigger: trackRef.current, start: "top 85%" },
        })
      }, sectionRef)

      return () => ctx.revert()
    })()
  }, [])

  /* Drag-to-scroll */
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current.offsetLeft)
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }
  const onMouseUp = () => { isDragging.current = false }

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-[#0d0a05] overflow-hidden"
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a227]/35 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#c9a227] opacity-[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-luxury mb-12">
        <div className="gallery-heading flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
              Galerie
            </p>
            <h2
              className="font-display font-light text-white leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Jeder Schnitt<br />
              <em className="not-italic text-gradient-gold">ein Meisterwerk.</em>
            </h2>
          </div>
          <p className="text-white/30 text-sm max-w-xs">
            Zieh die Galerie, um alle Styles zu sehen.
          </p>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        style={{
          paddingLeft: "clamp(1.5rem, 6vw, 9rem)",
          paddingRight: "clamp(1.5rem, 6vw, 9rem)",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {ITEMS.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} isActive={activeIndex === i} onHover={() => setActiveIndex(i)} />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="container-luxury mt-10 flex items-center gap-3">
        {ITEMS.map((_, i) => (
          <button
            key={i}
            className="transition-all duration-300"
            onClick={() => setActiveIndex(i)}
            aria-label={`Bild ${i + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? "24px" : "6px",
                height: "6px",
                background: activeIndex === i ? "#00d4ff" : "rgba(255,255,255,0.15)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

interface GalleryCardProps {
  item: (typeof ITEMS)[0]
  index: number
  isActive: boolean
  onHover: () => void
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onHover }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 relative overflow-hidden cursor-pointer"
      style={{ width: "clamp(240px, 28vw, 380px)", height: "clamp(320px, 42vw, 520px)" }}
      onHoverStart={() => { setHovered(true); onHover() }}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Real photo — object-cover fills the card */}
      <img
        src={item.img}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        draggable={false}
      />

      {/* Dark tint so the image doesn't feel raw */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Corner accent */}
      <div
        className="absolute top-4 right-4 w-5 h-5 border-t border-r transition-colors duration-300 z-10"
        style={{ borderColor: hovered ? item.accent : "rgba(255,255,255,0.15)" }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-8"
        initial={{ background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 50%)" }}
        animate={{
          background: hovered
            ? "linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,0.4) 70%, transparent 100%)"
            : "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 50%)",
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.35 }}
        >
          <p
            className="text-[0.6rem] tracking-[0.4em] uppercase mb-2"
            style={{ color: item.accent }}
          >
            {item.style}
          </p>
          <h3 className="font-display font-light text-2xl text-white">{item.label}</h3>
        </motion.div>

        <motion.div
          className="mt-4 flex items-center gap-3"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div
            className="w-6 h-px"
            style={{ background: item.accent }}
          />
          <span className="text-white/40 text-xs tracking-wider">Ansehen</span>
        </motion.div>
      </motion.div>

    </motion.div>
  )
}

export default GallerySection
