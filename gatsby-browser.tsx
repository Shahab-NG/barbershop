import "./src/styles/global.css"
import type { GatsbyBrowser } from "gatsby"

export const onClientEntry: GatsbyBrowser["onClientEntry"] = async () => {
  if (typeof window !== "undefined") {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    const { gsap } = await import("gsap")
    const { ScrollTrigger } = await import("gsap/ScrollTrigger")
    gsap.registerPlugin(ScrollTrigger)
    gsap.defaults({ ease: "power3.out" })
  }
}

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0)
  }
}
