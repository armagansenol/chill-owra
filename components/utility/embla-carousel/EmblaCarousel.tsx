import s from "./embla.module.scss"

import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import React, { ReactNode, useCallback, useEffect, useState } from "react"

import { NextButton, PrevButton } from "./buttons"

interface Props {
  children: ReactNode[]
  nextButton?: React.ReactNode
  options?: EmblaOptionsType
  scrollTo?: number | null
  prevButton?: React.ReactNode
  slideSpacing?: number
  btnsClassName?: string
}

const EmblaCarousel = (props: Props) => {
  const { children, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (props.scrollTo === null || props.scrollTo === undefined) return

    scrollTo(props.scrollTo)
  }, [props.scrollTo, scrollTo])

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit)
    emblaApi.on("reInit", onSelect)
    emblaApi.on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <div
      className={s.embla}
      style={
        {
          "--slide-spacing": `${props.slideSpacing}px`,
        } as React.CSSProperties
      }
    >
      <div className={s.emblaViewport} ref={emblaRef}>
        <div className={s.emblaContainer}>
          {children?.map((item, i) => (
            <div className={s.emblaSlide} key={i}>
              <div className={s.emblaSlideContent}>{item}</div>
            </div>
          ))}
        </div>
      </div>

      {props.prevButton && props.nextButton && (
        <div className={props.btnsClassName}>
          <div className={s.emblaButtons}>
            <PrevButton className={s.prev} onClick={scrollPrev} disabled={prevBtnDisabled}>
              {props.prevButton}
            </PrevButton>
          </div>

          <div className={s.emblaButtons}>
            <NextButton className={s.next} onClick={scrollNext} disabled={nextBtnDisabled}>
              {props.nextButton}
            </NextButton>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmblaCarousel
