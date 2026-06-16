import React, { useEffect, useRef, useState } from "react"

const CursorEffect: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (el.closest("a, button, [data-cursor='hover']")) setHovering(true)
    }

    const onOut = () => setHovering(false)

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.1)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.1)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px) scale(${clicking ? 0.5 : 1})`
      }
      if (ringRef.current) {
        const size = hovering ? 56 : clicking ? 20 : 36
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${ringPos.current.x - 60}px, ${ringPos.current.y - 60}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", onOver)
    document.addEventListener("mouseout", onOut)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseout", onOut)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [clicking, hovering])

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: hovering ? "#c9a227" : "#00d4ff",
          transition: "background 0.3s ease, transform 0.1s ease",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] transition-all"
        style={{
          border: hovering ? "1px solid rgba(201,162,39,0.6)" : "1px solid rgba(0,212,255,0.4)",
          transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease",
          willChange: "transform, width, height",
        }}
      />
      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[120px] h-[120px] rounded-full pointer-events-none z-[9996]"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  )
}

export default CursorEffect
