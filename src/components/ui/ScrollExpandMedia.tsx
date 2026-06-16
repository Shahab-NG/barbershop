import React, { useEffect, useRef, useState, ReactNode } from "react"
import { motion } from "framer-motion"

interface ScrollExpandMediaProps {
  mediaType?: "video" | "image"
  mediaSrc: string
  posterSrc?: string
  bgImageSrc: string
  title?: string
  subtitle?: string
  scrollToExpand?: string
  textBlend?: boolean
  children?: ReactNode
}

const ScrollExpandMedia: React.FC<ScrollExpandMediaProps> = ({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  subtitle,
  scrollToExpand = "Scrollen zum Entfalten",
  textBlend = false,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showContent, setShowContent]       = useState(false)
  const [expanded, setExpanded]             = useState(false)
  const [isMobile, setIsMobile]             = useState(false)
  const [isInView, setIsInView]             = useState(false)

  const sectionRef    = useRef<HTMLDivElement>(null)
  const progressRef   = useRef(0)
  const expandedRef   = useRef(false)
  const touchStartRef = useRef(0)
  const snappingRef   = useRef(false)   // prevents scroll → scrollTo → scroll loop

  /* keep refs in sync */
  useEffect(() => { progressRef.current = scrollProgress }, [scrollProgress])
  useEffect(() => { expandedRef.current = expanded },       [expanded])

  /* reset on mediaType change */
  useEffect(() => {
    setScrollProgress(0); setShowContent(false); setExpanded(false)
  }, [mediaType])

  /* mobile detection */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check, { passive: true })
    return () => window.removeEventListener("resize", check)
  }, [])

  /* IntersectionObserver — activate when section is 25 % visible */
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  /* ── all event listeners ── */
  useEffect(() => {
    const sectionTop = () => sectionRef.current?.offsetTop ?? 0

    /* wheel */
    const onWheel = (e: WheelEvent) => {
      if (!isInView) return
      const prog = progressRef.current
      const exp  = expandedRef.current

      if (exp && e.deltaY < 0 && window.scrollY <= sectionTop() + 8) {
        /* collapse when user scrolls up at section top */
        setExpanded(false)
        setScrollProgress(1)
        e.preventDefault()
        return
      }
      if (!exp) {
        e.preventDefault()
        const next = Math.min(Math.max(prog + e.deltaY * 0.0009, 0), 1)
        setScrollProgress(next)
        if (next >= 1)       { setExpanded(true);  setShowContent(true)  }
        else if (next < 0.75) { setShowContent(false) }
      }
    }

    /* touch */
    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!isInView) return
      const prog  = progressRef.current
      const exp   = expandedRef.current
      const delta = touchStartRef.current - e.touches[0].clientY

      if (exp && delta < -20 && window.scrollY <= sectionTop() + 8) {
        setExpanded(false); setScrollProgress(1); e.preventDefault(); return
      }
      if (!exp) {
        e.preventDefault()
        const factor = delta < 0 ? 0.008 : 0.005
        const next   = Math.min(Math.max(prog + delta * factor, 0), 1)
        setScrollProgress(next)
        if (next >= 1)        { setExpanded(true);  setShowContent(true)  }
        else if (next < 0.75) { setShowContent(false) }
        touchStartRef.current = e.touches[0].clientY
      }
    }
    const onTouchEnd = () => { touchStartRef.current = 0 }

    /* scroll — snap user back to section top while not yet expanded */
    const onScroll = () => {
      if (!isInView || expandedRef.current || snappingRef.current) return
      const top = sectionTop()
      if (Math.abs(window.scrollY - top) > 2) {
        snappingRef.current = true
        window.scrollTo(0, top)
        requestAnimationFrame(() => { snappingRef.current = false })
      }
    }

    window.addEventListener("wheel",      onWheel,      { passive: false })
    window.addEventListener("scroll",     onScroll,     { passive: true  })
    window.addEventListener("touchstart", onTouchStart, { passive: false })
    window.addEventListener("touchmove",  onTouchMove,  { passive: false })
    window.addEventListener("touchend",   onTouchEnd)

    return () => {
      window.removeEventListener("wheel",      onWheel)
      window.removeEventListener("scroll",     onScroll)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove",  onTouchMove)
      window.removeEventListener("touchend",   onTouchEnd)
    }
  }, [isInView])   // only re-attach when in-view status changes

  /* ── derived values ── */
  const mediaW = 300 + scrollProgress * (isMobile ?  620 : 1200)
  const mediaH = 400 + scrollProgress * (isMobile ?  200 :  380)
  const shift  = scrollProgress * (isMobile ? 180 : 150)

  const firstWord = title?.split(" ")[0] ?? ""
  const restTitle = title?.split(" ").slice(1).join(" ") ?? ""

  return (
    <div ref={sectionRef} className="overflow-x-hidden bg-[#050505]">
      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">

          {/* ── Background (fades out as media expands) ── */}
          <motion.div
            className="absolute inset-0 z-0"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <img
              src={bgImageSrc}
              alt=""
              aria-hidden
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#050505]/55" />
          </motion.div>

          {/* ── Main viewport area ── */}
          <div className="w-full flex flex-col items-center justify-start relative z-10">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">

              {/* Expanding media box — absolute, centered, z-0 (behind text) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                style={{
                  width:     `${mediaW}px`,
                  height:    `${mediaH}px`,
                  maxWidth:  "95vw",
                  maxHeight: "85vh",
                  borderRadius: `${Math.max(0, 16 - scrollProgress * 16)}px`,
                  boxShadow: "0 0 80px rgba(0,0,0,0.6)",
                  zIndex: 0,
                }}
              >
                {mediaType === "image" ? (
                  <>
                    <img src={mediaSrc} alt={title ?? ""} className="w-full h-full object-cover" />
                    <motion.div
                      className="absolute inset-0 bg-black"
                      animate={{ opacity: 0.7 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.15 }}
                    />
                  </>
                ) : (
                  <>
                    <video
                      src={mediaSrc} poster={posterSrc}
                      autoPlay muted loop playsInline preload="auto"
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black"
                      animate={{ opacity: 0.45 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.15 }}
                    />
                  </>
                )}

                {/* Blue border that fades as media expands */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px rgba(0,212,255,${(1 - scrollProgress) * 0.35})`,
                    borderRadius: "inherit",
                  }}
                />
              </div>

              {/* ── Text overlay (all in normal flex flow, centered in 100dvh) ── */}

              {/* Subtitle + scroll hint — fly apart horizontally */}
              <div className="flex flex-col items-center gap-2 relative z-10 mb-6">
                {subtitle && (
                  <p
                    className="text-[#00d4ff] text-[0.6rem] tracking-[0.5em] uppercase select-none"
                    style={{ transform: `translateX(-${shift}vw)`, opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
                  >
                    {subtitle}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className="text-white/35 text-[0.6rem] tracking-[0.4em] uppercase select-none"
                    style={{ transform: `translateX(${shift}vw)`, opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>

              {/* Title — two words fly in opposite directions */}
              {title && (
                <div
                  className={`flex flex-col items-center justify-center gap-2 w-full relative z-10 select-none ${
                    textBlend ? "mix-blend-difference" : ""
                  }`}
                >
                  <p
                    className="font-display font-light text-white leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                      transform: `translateX(-${shift}vw)`,
                    }}
                  >
                    {firstWord}
                  </p>
                  <p
                    className="font-display font-light leading-none text-gradient-gold"
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
                      transform: `translateX(${shift}vw)`,
                    }}
                  >
                    {restTitle}
                  </p>
                </div>
              )}

              {/* Progress bar (right side) */}
              <div
                className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-none z-10"
                style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
              >
                <div className="w-px h-24 bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full bg-[#00d4ff]"
                    style={{ height: `${scrollProgress * 100}%` }}
                  />
                </div>
                <span
                  className="text-white/20 text-[9px] tracking-widest uppercase"
                  style={{ writingMode: "vertical-rl" }}
                >
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
            </div>

            {/* ── Children — revealed after full expansion ── */}
            <motion.div
              className="w-full px-6 py-16 md:px-16 lg:py-24 bg-[#050505]"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ScrollExpandMedia
