/**
 * ParticleBackground – Three.js floating particle field.
 * Rendered to a fixed canvas behind all content.
 * Mouse position gently steers rotation.
 */
import React, { useEffect, useRef } from "react"

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return

    const canvas = canvasRef.current
    let renderer: any, scene: any, camera: any, points: any

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    }
    window.addEventListener("mousemove", onMouseMove, { passive: true })

    const init = async () => {
      const THREE = await import("three")

      scene = new THREE.Scene()

      camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1200)
      camera.position.z = 60

      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setClearColor(0x000000, 0)

      /* Particle geometry */
      const COUNT = 1800
      const pos = new Float32Array(COUNT * 3)
      const col = new Float32Array(COUNT * 3)
      const sz  = new Float32Array(COUNT)

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        pos[i3]     = (Math.random() - 0.5) * 220
        pos[i3 + 1] = (Math.random() - 0.5) * 220
        pos[i3 + 2] = (Math.random() - 0.5) * 120

        const t = Math.random()
        if (t < 0.55) {
          // electric blue
          col[i3] = 0; col[i3+1] = 0.55 + Math.random() * 0.45; col[i3+2] = 1
        } else if (t < 0.78) {
          // gold
          col[i3] = 0.78 + Math.random() * 0.22; col[i3+1] = 0.45 + Math.random() * 0.35; col[i3+2] = 0.08
        } else {
          // silver
          const v = 0.5 + Math.random() * 0.5
          col[i3] = v; col[i3+1] = v; col[i3+2] = v
        }

        sz[i] = Math.random() * 1.6 + 0.4
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      geo.setAttribute("color",    new THREE.BufferAttribute(col, 3))
      geo.setAttribute("size",     new THREE.BufferAttribute(sz,  1))

      const mat = new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
      })

      points = new THREE.Points(geo, mat)
      scene.add(points)

      /* Resize */
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener("resize", onResize, { passive: true })

      /* Animation loop */
      const clock = new THREE.Clock()
      const animate = () => {
        rafRef.current = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()
        points.rotation.y = t * 0.018 + (mouse.current.x - 0.5) * 0.06
        points.rotation.x = t * 0.009 + (mouse.current.y - 0.5) * 0.04
        renderer.render(scene, camera)
      }
      animate()

      return () => window.removeEventListener("resize", onResize)
    }

    init()

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafRef.current)
      renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.35 }}
    />
  )
}

export default ParticleBackground
