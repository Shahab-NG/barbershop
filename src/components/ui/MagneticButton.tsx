import React, { useRef, useCallback } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  strength?: number
}

const MagneticButton: React.FC<Props> = ({
  children,
  className = "",
  href,
  onClick,
  strength = 0.35,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const El = href ? "a" : "button"

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <El href={href} onClick={onClick} className={className}>
        {children}
      </El>
    </motion.div>
  )
}

export default MagneticButton
