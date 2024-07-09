import s from "./home/home.module.scss"

import cx from "clsx"

import GravityRectangle from "@/components/gravity-rectangle/GravityRectangle"
import { IconCursorClick, OwraLogo } from "@/components/icons/logo"
import { ClientOnly } from "@/components/isomorphic"
import { useModalStore } from "@/lib/store/modal"

import { Img } from "@/components/utility/img"
import iceSitting from "@/public/img/ice-sitting.png"

export default function Home() {
  const modalStore = useModalStore()

  function handleModal() {
    modalStore.setIsOpen(true)
    modalStore.setContent(
      <>
        <div className={cx(s.modalContent, "h-10 w-10 bg-white")}>
          <div className={cx(s.header, "flex items-center justify-between")}>
            <p className={s.title}>Feeling Thirsty</p>
            <span className={s.iconC}>
              <IconCursorClick />
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
    <div className={cx(s.home, "w-screen h-screen relative")}>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <ClientOnly>
          <GravityRectangle />
        </ClientOnly>
      </div>

      <header className={cx(s.header, "flex items-center justify-between")}>
        <button className={cx(s.button, "opacity-0 pointer-events-none")}>Feeling Thirsty</button>
        <div className={s.logoC}>
          <OwraLogo />
        </div>
        <button className={cx(s.button, "flex items-center justify-between")} onClick={handleModal}>
          <span>Feeling Thirsty</span>
          <span className={s.iconC}>
            <IconCursorClick />
          </span>
        </button>
      </header>

      {/* <div className={s.comingSoon}>
        <Marquee>
          <div className={s.iconC}>Coming Soon</div>
        </Marquee>
      </div> */}
    </div>
  )
}
