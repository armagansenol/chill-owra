import s from "./home/home.module.scss"

import { useModalStore } from "@/lib/store/modal"
import cx from "clsx"

import { IconClose, IconCursorClick, OwraLogo } from "@/components/icons/logo"
import { Img } from "@/components/utility/img"
import { LoadingSpinner } from "@/components/utility/loading-spinner"
import dynamic from "next/dynamic"

import iceSitting from "@/public/img/ice-sitting.png"
import { ReactNode } from "react"
import GravityRectangle from "@/components/gravity-rectangle/GravityRectangle"
import { ClientOnly } from "@/components/isomorphic"

// const GravityRectangle = dynamic(() => import("@/components/gravity-rectangle").then((m) => m.GravityCircle), {
//   loading: () => (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <LoadingSpinner />
//     </div>
//   ),
//   ssr: false,
// })

export default function Home() {
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
    <div className={cx(s.home, "w-screen h-screen relative")}>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <ClientOnly>
          <GravityRectangle />
        </ClientOnly>
      </div>

      <header className={cx(s.header, "flex items-center justify-between pointer-events-none z-20 relative")}>
        <button className={cx(s.button, "opacity-0 pointer-events-none")}>Feeling Thirsty</button>
        <div className={s.logoC}>
          <OwraLogo />
        </div>
        <button
          className={cx(s.button, "flex items-center justify-between pointer-events-auto cursor-pointer")}
          onClick={handleModal}
        >
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
