import s from "./modal.module.scss"

import { ScrollTrigger, gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

import { useLenisStore } from "@/lib/store/lenis"
import { useModalStore } from "@/lib/store/modal"
import { useCursorStore } from "@/lib/store/cursor"

const Modal = () => {
  const { isOpen, content } = useModalStore()
  const cursorStore = useCursorStore()
  const lenis = useLenisStore()
  const ref = useRef(null)
  const duration = 0.4

  useGSAP(
    () => {
      if (isOpen) {
        lenis.setIsStopped(true)
        gsap.to(ref.current, {
          duration,
          opacity: 1,
          pointerEvents: "auto",
        })
      } else {
        gsap.to(ref.current, {
          duration,
          opacity: 0,
          pointerEvents: "none",
          onComplete: () => {
            lenis.setIsStopped(false)
            cursorStore.reset()
            ScrollTrigger.refresh()
          },
        })
      }
    },
    {
      dependencies: [isOpen],
    }
  )

  return (
    <div className={s.modal} ref={ref}>
      {/* <div className={cx(s.iconClose, "cursor-pointer")} onClick={closeModal}>
        <IconClose fill="var(--white)" />
      </div> */}
      {content}
    </div>
  )
}

export default Modal
