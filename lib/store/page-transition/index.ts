import { create } from "zustand"
import { gsap } from "@/lib/gsap"

interface State {
  timeline: gsap.core.Timeline | null
  setTimeline: (tl: gsap.core.Timeline) => void
  // background: string
  // setBackground: (color: string) => void
}

export const useStore = create<State>((set) => ({
  timeline: gsap.timeline({ paused: true }),
  setTimeline: (timeline) => set({ timeline }),
  // background: "red",
  // setBackground: (background) => set({ background }),
}))

export const usePageTransitionStore = useStore
