import React, { useEffect, useRef } from "react"
import MagneticButton from "../ui/MagneticButton"

const BookingSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  /* Animated gradient canvas background */
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")!
    let raf: number
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }
    canvas.addEventListener("mousemove", onMove, { passive: true })

    const draw = () => {
      raf = requestAnimationFrame(draw)
      t += 0.003
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      /* Shifting gradient orbs */
      const orbs = [
        { x: 0.3 + Math.sin(t) * 0.15, y: 0.4 + Math.cos(t * 0.7) * 0.2, r: 0.55, color: "rgba(0,212,255,0.13)" },
        { x: 0.7 + Math.cos(t * 1.1) * 0.15, y: 0.6 + Math.sin(t * 0.8) * 0.15, r: 0.5, color: "rgba(201,162,39,0.11)" },
        {
          x: mouse.current.x * 0.6 + 0.2,
          y: mouse.current.y * 0.6 + 0.2,
          r: 0.35,
          color: "rgba(0,212,255,0.09)",
        },
      ]

      orbs.forEach(orb => {
        const grd = ctx.createRadialGradient(
          orb.x * W, orb.y * H, 0,
          orb.x * W, orb.y * H, orb.r * Math.max(W, H)
        )
        grd.addColorStop(0, orb.color)
        grd.addColorStop(1, "transparent")
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, W, H)
      })
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", onMove)
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    ;(async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)
      gsap.from(".booking-content > *", {
        opacity: 0, y: 40, stagger: 0.15, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      })
    })()
  }, [])

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-32 md:py-52 bg-[#050505] overflow-hidden"
      style={{ borderTop: "1px solid rgba(0,212,255,0.12)" }}
    >
      {/* Animated canvas bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />

      <div className="container-luxury relative z-10">
        <div className="booking-content text-center max-w-3xl mx-auto">
          <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-7">
            Bereit für dein Statement?
          </p>

          <h2
            className="font-display font-light text-white leading-[0.9] mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Buche deinen<br />
            <em className="not-italic text-gradient-gold">Termin</em>
          </h2>

          <p className="text-white/40 font-light text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Dein nächstes Level beginnt mit einem Klick. Sichere dir jetzt deinen
            Wunschtermin – einfach, schnell und ohne Wartezeit.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <MagneticButton
              href="tel:+4915012345678"
              className="group relative px-10 py-5 bg-[#00d4ff] text-[#050505] text-[0.7rem] font-bold tracking-[0.3em] uppercase overflow-hidden block [box-shadow:0_0_40px_rgba(0,212,255,0.2)]"
            >
              <span className="relative z-10">Jetzt anrufen</span>
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </MagneticButton>

            <MagneticButton
              href="https://wa.me/4915012345678"
              className="group px-10 py-5 border border-white/20 text-white text-[0.7rem] font-semibold tracking-[0.3em] uppercase hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300 block"
            >
              WhatsApp buchen
            </MagneticButton>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "◈", title: "Kein Warten", desc: "Direkte Terminbuchung" },
              { icon: "✦", title: "Flexible Zeiten", desc: "Mo – Sa, 9 – 20 Uhr" },
              { icon: "◇", title: "Premium Erlebnis", desc: "Ab dem ersten Moment" },
            ].map(f => (
              <div key={f.title} className="glass px-6 py-5 text-center">
                <span className="text-[#00d4ff] text-xl mb-3 block">{f.icon}</span>
                <p className="text-white text-sm font-medium mb-1">{f.title}</p>
                <p className="text-white/30 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingSection
