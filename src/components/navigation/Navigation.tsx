import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Über Uns", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Expertise", href: "#expertise" },
  { label: "Reviews", href: "#reviews" },
  { label: "Kontakt", href: "#contact" },
]

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const handleLinkEnter = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!indicatorRef.current || !navRef.current) return
    const link = e.currentTarget
    const navRect = navRef.current.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    indicatorRef.current.style.width = `${linkRect.width}px`
    indicatorRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`
    indicatorRef.current.style.opacity = "1"
  }, [])

  const handleNavLeave = useCallback(() => {
    if (!indicatorRef.current) return
    indicatorRef.current.style.opacity = "0"
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "py-4 bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.04]"
            : "py-7 bg-transparent"
        }`}
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group select-none">
            <span className="font-display font-light text-[1.35rem] tracking-[0.25em] text-white group-hover:text-white/80 transition-colors duration-500">
              AMIR
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c9a227] flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
            <span className="font-display font-light text-[1.35rem] tracking-[0.25em] text-[#c9a227] group-hover:text-[#f4d03f] transition-colors duration-500">
              BARBERSHOP
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            ref={navRef}
            onMouseLeave={handleNavLeave}
            className="hidden lg:flex items-center gap-8 relative"
          >
            {/* Animated indicator */}
            <span
              ref={indicatorRef}
              className="absolute bottom-0 h-px bg-[#00d4ff] pointer-events-none opacity-0 transition-all duration-300"
              style={{ willChange: "transform, width" }}
            />
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={handleLinkEnter}
                className="text-[0.72rem] tracking-[0.18em] uppercase text-white/50 hover:text-white transition-colors duration-300 pb-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#booking"
            className="hidden lg:inline-flex items-center gap-3 px-6 py-2.5 text-[0.7rem] tracking-[0.2em] uppercase font-semibold text-[#0a0a0a] bg-[#00d4ff] relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
          >
            <span className="relative z-10">Termin buchen</span>
            <span className="relative z-10 w-4 h-px bg-[#0a0a0a] group-hover:w-6 transition-all duration-300" />
            <span className="absolute inset-0 bg-[#c9a227] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden flex flex-col gap-[5px] w-8 h-8 justify-center items-end"
            aria-label="Menü öffnen"
          >
            <span
              className={`block h-px bg-white transition-all duration-400 ${menuOpen ? "w-7 rotate-45 translate-y-[9px]" : "w-7"}`}
            />
            <span
              className={`block h-px bg-white transition-all duration-400 ${menuOpen ? "w-0 opacity-0" : "w-5"}`}
            />
            <span
              className={`block h-px bg-white transition-all duration-400 ${menuOpen ? "w-7 -rotate-45 -translate-y-[7px]" : "w-7"}`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#050505] flex flex-col justify-center px-10"
          >
            {/* Decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />

            <nav>
              <ul className="space-y-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-display font-light text-[clamp(2.5rem,8vw,5rem)] text-white/70 hover:text-white transition-colors duration-300 leading-tight group"
                    >
                      <span className="group-hover:text-gradient-blue">{link.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12"
              >
                <a
                  href="#booking"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-10 py-4 text-[0.8rem] tracking-[0.25em] uppercase font-semibold text-[#0a0a0a] bg-[#00d4ff] hover:bg-[#c9a227] transition-colors duration-300"
                >
                  Termin buchen
                </a>
              </motion.div>
            </nav>

            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center text-white/20 text-xs tracking-widest uppercase">
              <span>Premium Barbershop</span>
              <span>© 2025</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
