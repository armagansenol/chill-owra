import s from "./home/home.module.scss"

import cx from "clsx"

import { OwraLogo } from "@/components/icons/logo"

import Button from "@/components/button"
import { ClientOnly } from "@/components/isomorphic"
import { LoadingSpinner } from "@/components/utility/loading-spinner"
import dynamic from "next/dynamic"
import { Img } from "@/components/utility/img"

import iceBottom from "@/public/img/ice-bottom.png"
import { CustomHead } from "@/components/utility/custom-head"

const Scene = dynamic(() => import("@/components/scene").then((m) => m.Scene), {
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

export default function Home() {
  return (
    <>
      <CustomHead
        canonical="https://chill-owra.com"
        title="Chill Owra"
        description="Chill Owra - Ice Glass"
        keywords={["ice", "ice glass", "drink", "chill", "chill owra"]}
        themeColor="#0075ce"
      ></CustomHead>
      <div className={cx(s.home, "w-screen h-screen relative overflow-hidden")}>
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <ClientOnly>
            <Scene />
          </ClientOnly>
        </div>

        <header className={cx(s.header, "flex items-center justify-center pointer-events-none z-20 relative")}>
          <div className={s.logoC}>
            <OwraLogo />
          </div>
        </header>

        <Button />

        <div className={s.bottomImgC}>
          <Img alt="Ice Cubes" className="object-contain" src={iceBottom} />
        </div>
      </div>
    </>
  )
}
