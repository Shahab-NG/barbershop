import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const FRAME_COUNT = 60
const FRAMES = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`
)

const HairTransformationSequence: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const currentFrame = useRef(0)
  const images = useRef<HTMLImageElement[]>([])
  const [loadedCount, setLoadedCount] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)
  const [displayProgress, setDisplayProgress] = useState(0)

  /* ── Preload all frames ── */
  useEffect(() => {
    if (typeof window === "undefined") return

    let loaded = 0
    images.current = FRAMES.map(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === FRAME_COUNT) setAllLoaded(true)
      }
      img.onerror = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === FRAME_COUNT) setAllLoaded(true)
      }
      return img
    })
  }, [])

  /* ── Canvas render loop + GSAP ── */
  useEffect(() => {
    if (typeof window === "undefined" || !allLoaded) return

    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    /* Resize canvas */
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize, { passive: true })

    /* Mouse tracking */
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    /* Draw a single frame to canvas */
    const drawFrame = (idx: number) => {
      const img = images.current[idx]
      if (!img || !img.complete || !img.naturalWidth) return

      const W = canvas.width
      const H = canvas.height

      /* ── Full-screen cover, top-anchored ──
         CSS equivalent: object-fit:cover; object-position: center top
         The nav is transparent so the image shows behind it.        */
      const vAspect = img.naturalWidth / img.naturalHeight
      const cAspect = W / H
      let dw: number, dh: number, dx: number, dy: number

      if (vAspect > cAspect) {
        /* Landscape video wider than screen → fill height, center horiz */
        dh = H; dw = H * vAspect
        dx = (W - dw) / 2; dy = 0
      } else {
        /* Portrait/square video → fill width, anchor to TOP so face shows */
        dw = W; dh = W / vAspect
        dx = 0; dy = 0
      }

      /* 1. Image — full screen */
      ctx.drawImage(img, dx, dy, dw, dh)

      /* 2. Vignette (standard centered) */
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.22, W / 2, H / 2, H * 0.88)
      vig.addColorStop(0, "transparent")
      vig.addColorStop(1, "rgba(5,5,5,0.72)")
      ctx.fillStyle = vig
      ctx.fillRect(0, 0, W, H)

      /* 3. Bottom fade — blends into page sections below */
      const btm = ctx.createLinearGradient(0, H * 0.62, 0, H)
      btm.addColorStop(0, "transparent")
      btm.addColorStop(1, "rgba(5,5,5,1)")
      ctx.fillStyle = btm
      ctx.fillRect(0, 0, W, H)

      /* 4. Top gradient — keeps nav text readable against bright footage */
      const top = ctx.createLinearGradient(0, 0, 0, 120)
      top.addColorStop(0, "rgba(5,5,5,0.55)")
      top.addColorStop(1, "transparent")
      ctx.fillStyle = top
      ctx.fillRect(0, 0, W, H)

      /* Mouse-reactive blue light */
      const mx = mouse.current.x * W
      const my = mouse.current.y * H
      const lightGrad = ctx.createRadialGradient(mx, my, 0, mx, my, W * 0.45)
      lightGrad.addColorStop(0, "rgba(0,212,255,0.055)")
      lightGrad.addColorStop(1, "transparent")
      ctx.fillStyle = lightGrad
      ctx.fillRect(0, 0, W, H)
    }

    /* Render loop — redraws whenever frame changes */
    let lastFrame = -1
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick)
      const f = currentFrame.current
      if (f !== lastFrame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawFrame(f)
        lastFrame = f
      }
    }
    drawFrame(0)
    tick()

    /* GSAP ScrollTrigger */
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 0.3,
        onUpdate: self => {
          const p = self.progress
          setDisplayProgress(p)
          currentFrame.current = Math.min(
            FRAME_COUNT - 1,
            Math.floor(p * FRAME_COUNT)
          )
        },
      })
    }
    initGSAP()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [allLoaded])

  /* Overlay opacities */
  const titleOpacity = allLoaded ? Math.max(0, 1 - displayProgress * 4.5) : 0
  const midOpacity = Math.max(0, Math.min(1, (displayProgress - 0.28) * 7) - Math.max(0, (displayProgress - 0.58) * 7))
  const ctaOpacity = Math.max(0, (displayProgress - 0.75) * 6)
  const scrollIndicatorOpacity = allLoaded ? Math.max(0, 1 - displayProgress * 15) : 0
  const loadPercent = Math.round((loadedCount / FRAME_COUNT) * 100)

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
      {/* Canvas — the actual visible surface */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: allLoaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      />

      {/* Loading state */}
      {!allLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-48 h-px bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[#00d4ff] transition-all duration-300"
                style={{ width: `${loadPercent}%` }}
              />
            </div>
            <span className="text-white/25 text-[10px] tracking-[0.5em] uppercase font-medium">
              Laden… {loadPercent}%
            </span>
          </div>
        </div>
      )}

      {/* Overlay 1: Hero headline */}
      <div
        className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none px-[clamp(2rem,8vw,9rem)]"
        style={{ opacity: titleOpacity }}
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: allLoaded ? 1 : 0, y: allLoaded ? 0 : 24 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[#00d4ff] text-[0.7rem] tracking-[0.55em] uppercase mb-7"
        >
          Premium Barbershop · Deutschland
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: allLoaded ? 1 : 0, y: allLoaded ? 0 : 50 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-light text-white leading-[0.88] text-left"
          style={{ fontSize: "clamp(3.2rem, 9.5vw, 8.5rem)" }}
        >
          Mehr als ein<br />
          <em className="not-italic" style={{ color: "#c9a227" }}>Haarschnitt.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: allLoaded ? 1 : 0, y: allLoaded ? 0 : 20 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-7 text-white/50 font-light max-w-lg text-left"
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
        >
          Ein Statement.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: allLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-4 text-white/30 font-light max-w-lg text-left text-sm md:text-base"
        >
          Premium Grooming und moderne Barberkunst in Perfektion.
        </motion.p>
      </div>

      {/* Overlay 2: Mid-scroll */}
      <div
        className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none px-[clamp(2rem,8vw,9rem)]"
        style={{ opacity: midOpacity }}
      >
        <p className="text-[#00d4ff] text-[0.65rem] tracking-[0.55em] uppercase mb-5">
          Die Transformation
        </p>
        <h2
          className="font-display font-light text-white leading-tight text-left"
          style={{ fontSize: "clamp(2.2rem, 6vw, 5.5rem)" }}
        >
          Precision.&nbsp;Style.<br />
          <span className="text-gradient-gold italic">Perfektion.</span>
        </h2>
      </div>

      {/* Overlay 3: CTA */}
      <div
        className="absolute bottom-24 left-0 right-0 flex flex-col items-start gap-6 pointer-events-none px-[clamp(2rem,8vw,9rem)]"
        style={{ opacity: ctaOpacity }}
      >
        <p className="text-white/40 text-xs tracking-[0.4em] uppercase">
          Bereit für dein Statement?
        </p>
        <div className="flex flex-wrap justify-start gap-4 pointer-events-auto">
          <a
            href="#booking"
            className="px-9 py-4 bg-[#00d4ff] text-[#050505] text-[0.7rem] font-bold tracking-[0.25em] uppercase hover:bg-white hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300"
          >
            Termin buchen
          </a>
          <a
            href="#services"
            className="px-9 py-4 border border-white/25 text-white text-[0.7rem] font-semibold tracking-[0.25em] uppercase hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all duration-300"
          >
            Unsere Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-[9px] tracking-[0.55em] uppercase">Scrollen</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#00d4ff]/60 to-transparent" />
        </motion.div>
      </div>

      {/* Progress bar */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none">
        <div className="w-px h-32 bg-white/10 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-[#00d4ff] transition-none"
            style={{ height: `${displayProgress * 100}%` }}
          />
        </div>
        <span
          className="text-white/20 text-[9px] tracking-widest uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          {Math.round(displayProgress * 100)}%
        </span>
      </div>
    </div>
  )
}

export default HairTransformationSequence
