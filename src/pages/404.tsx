import React, { useEffect, useRef } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { motion } from "framer-motion"
import Layout from "../components/layout/Layout"

const NotFoundPage: React.FC<PageProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    const draw = () => {
      raf = requestAnimationFrame(draw)
      t += 0.004
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width
      const H = canvas.height

      const orbs = [
        { x: 0.3 + Math.sin(t) * 0.2, y: 0.4 + Math.cos(t * 0.7) * 0.2, r: 0.6, color: "rgba(0,212,255,0.07)" },
        { x: 0.7 + Math.cos(t * 1.1) * 0.2, y: 0.6 + Math.sin(t * 0.8) * 0.15, r: 0.5, color: "rgba(201,162,39,0.05)" },
      ]
      orbs.forEach(orb => {
        const g = ctx.createRadialGradient(orb.x * W, orb.y * H, 0, orb.x * W, orb.y * H, orb.r * Math.max(W, H))
        g.addColorStop(0, orb.color)
        g.addColorStop(1, "transparent")
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      })
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-6">
          {/* Giant 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative inline-block mb-8"
          >
            <span
              className="font-display font-light leading-none select-none"
              style={{
                fontSize: "clamp(8rem, 25vw, 20rem)",
                color: "rgba(255,255,255,0.03)",
                letterSpacing: "-0.02em",
              }}
            >
              404
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center font-display font-light leading-none text-gradient-blue"
              style={{
                fontSize: "clamp(8rem, 25vw, 20rem)",
                letterSpacing: "-0.02em",
                WebkitTextStroke: "1px rgba(0,212,255,0.2)",
                color: "transparent",
              }}
            >
              404
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
              Seite nicht gefunden
            </p>
            <h1
              className="font-display font-light text-white leading-tight mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
            >
              Diese Seite existiert<br />
              <em className="not-italic text-gradient-gold">nicht (mehr).</em>
            </h1>
            <p className="text-white/35 text-sm max-w-sm mx-auto leading-relaxed mb-12">
              Die gesuchte Seite wurde möglicherweise entfernt oder der Link ist veraltet.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/"
              className="px-10 py-4 bg-[#00d4ff] text-[#050505] text-[0.7rem] font-bold tracking-[0.25em] uppercase hover:bg-white hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300"
            >
              Zur Startseite
            </a>
            <a
              href="#booking"
              className="px-10 py-4 border border-white/15 text-white/60 text-[0.7rem] font-semibold tracking-[0.25em] uppercase hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
            >
              Termin buchen
            </a>
          </motion.div>
        </div>

        {/* Corner accents */}
        <span className="absolute top-8 left-8 w-10 h-10 border-t border-l border-[#00d4ff]/20 pointer-events-none" />
        <span className="absolute top-8 right-8 w-10 h-10 border-t border-r border-[#00d4ff]/20 pointer-events-none" />
        <span className="absolute bottom-8 left-8 w-10 h-10 border-b border-l border-[#00d4ff]/20 pointer-events-none" />
        <span className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-[#00d4ff]/20 pointer-events-none" />
      </section>
    </Layout>
  )
}

export const Head: HeadFC = () => (
  <>
    <title>404 – Seite nicht gefunden | Amir Barbershop</title>
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#0a0a0a" />
  </>
)

export default NotFoundPage
