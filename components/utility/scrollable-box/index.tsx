import { ReactNode, useRef, useState } from "react"
import s from "./scrollable-box.module.scss"

import { gsap } from "@/lib/gsap"
import Lenis from "lenis"
import cn from "clsx"
import { useIsomorphicLayoutEffect } from "usehooks-ts"

type Props = {
  children: ReactNode
  className?: string
  infinite?: boolean
  reset?: boolean
}

const ScrollableBox = ({ children, className, infinite, reset }: Props) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    if (!wrapperRef.current) return
    if (!contentRef.current) return

    const lenis = new Lenis({
      wrapper: wrapperRef.current, // element which has overflow
      content: contentRef.current, // usually wrapper's direct child
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      infinite,
    })
    setLenis(lenis)

    return () => {
      lenis.destroy()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    function update(time: number) {
      lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)
  }, [lenis])

  useIsomorphicLayoutEffect(() => {
    if (reset) {
      lenis?.scrollTo(0, { immediate: true })
    }
  }, [reset])

  return (
    <div className={cn(s.hi, className)} ref={wrapperRef}>
      <div ref={contentRef}>{children}</div>
    </div>
  )
}

export { ScrollableBox }
