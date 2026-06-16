import React from "react"
import HairTransformationSequence from "../effects/HairTransformationSequence"
import ParticleBackground from "../effects/ParticleBackground"

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative">
      {/* Three.js particles behind everything */}
      <ParticleBackground />
      {/* Scroll-driven canvas hero */}
      <HairTransformationSequence />
    </section>
  )
}

export default HeroSection
