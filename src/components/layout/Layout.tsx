import React from "react"
import Navigation from "../navigation/Navigation"
import CursorEffect from "../effects/CursorEffect"

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Noise texture */}
      <div className="noise" aria-hidden />

      {/* Custom cursor (client-side only via useEffect) */}
      <CursorEffect />

      <Navigation />

      <main id="main">{children}</main>

      <footer className="relative border-t border-white/[0.04] py-12">
        <div className="container-luxury flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-display font-light text-xl tracking-[0.2em] text-white">AMIR</span>
            <span className="w-1 h-1 rounded-full bg-[#c9a227]" />
            <span className="font-display font-light text-xl tracking-[0.2em] text-[#c9a227]">BARBERSHOP</span>
          </div>

          <p className="text-white/25 text-xs tracking-widest uppercase">
            © {new Date().getFullYear()} Amir Barbershop — Alle Rechte vorbehalten
          </p>

          <nav className="flex items-center gap-6 text-xs text-white/30 tracking-wider uppercase">
            <a href="/impressum" className="hover:text-white/70 transition-colors">Impressum</a>
            <a href="/datenschutz" className="hover:text-white/70 transition-colors">Datenschutz</a>
          </nav>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent" />
      </footer>
    </div>
  )
}

export default Layout
