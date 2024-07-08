import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from "gsap/dist/CustomEase"
gsap.registerPlugin(ScrollTrigger, CustomEase)

// const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2
// const RECIPROCAL_GR = 1 / GOLDEN_RATIO
// const DURATION = RECIPROCAL_GR

const EASE = CustomEase.create("ease", "0.175, 0.885, 0.32, 1")

gsap.defaults({
  duration: 0.4,
  ease: "none",
})

ScrollTrigger.defaults({
  markers: false,
  // markers: process.env.NEXT_PUBLIC_NODE_ENV === "development"
})

export { ScrollTrigger, CustomEase, EASE, gsap }
