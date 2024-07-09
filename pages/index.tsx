import s from "./home/home.module.scss"

import cx from "clsx"

import GravityRectangle from "@/components/gravity-rectangle/GravityRectangle"
import { IconCursorClick, OwraLogo } from "@/components/icons/logo"
import { ClientOnly } from "@/components/isomorphic"
import { Marquee } from "@/components/marquee"

export default function Home() {
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
        <button className={cx(s.button, "flex items-center justify-between")}>
          <span>Feeling Thirsty</span>
          <span className={s.iconC}>
            <IconCursorClick />
          </span>
        </button>
      </header>

      <div className={s.comingSoon}>
        <Marquee>
          <div className={s.iconC}>Coming Soon</div>
        </Marquee>
      </div>
    </div>
  )
}
