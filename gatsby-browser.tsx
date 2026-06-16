import "./src/styles/global.css"
import type { GatsbyBrowser } from "gatsby"

export const onClientEntry: GatsbyBrowser["onClientEntry"] = async () => {
  if (typeof window !== "undefined") {
    const { gsap } = await import("gsap")
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")
    gsap.registerPlugin(ScrollTrigger)
    gsap.defaults({ ease: "power3.out" })
  }
}
