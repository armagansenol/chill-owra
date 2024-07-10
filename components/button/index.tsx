import s from "./button.module.scss"

import cx from "clsx"

import { useModalStore } from "@/lib/store/modal"
import iceSitting from "@/public/img/ice-sitting.png"
import { IconClose, IconCursorClick } from "../icons/logo"
import { Img } from "../utility/img"

export interface ButtonProps {}

export default function Button(props: ButtonProps) {
  const modalStore = useModalStore()

  function handleModal() {
    modalStore.setIsOpen(true)
    modalStore.setContent(
      <>
        <div className={cx(s.modalContent, "h-10 w-10 bg-white")}>
          <div className={cx(s.header, "flex items-center justify-between")}>
            <p className={s.title}>Feeling Thirsty</p>
            <span className={cx(s.iconC, "cursor-pointer")} onClick={() => modalStore.setIsOpen(false)}>
              <IconClose />
            </span>
          </div>

          <div className={s.content}>
            <p>If you’re craving your favorite frozen concoction, drop us an email.</p>
            <p>We promise it’s worth the brain freeze!</p>
            <button>Drop a Line & Chill</button>
          </div>

          <div className={s.iceC}>
            <Img alt="Ice Cube Sitting" src={iceSitting} height={500} width={500} />
          </div>
        </div>
      </>
    )
  }
  return (
    <button
      className={cx(s.button, "flex items-center justify-between pointer-events-auto cursor-pointer")}
      onClick={handleModal}
    >
      <span>Feeling Thirsty</span>
      <span className={s.iconC}>
        <IconCursorClick />
      </span>
    </button>
  )
}