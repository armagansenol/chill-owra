import s from "./home/home.module.scss"

import cx from "clsx"

import { OwraLogo } from "@/components/icons/logo"

import Button from "@/components/button"
import { Img } from "@/components/utility/img"
import { LoadingSpinner } from "@/components/utility/loading-spinner"
import dynamic from "next/dynamic"

import { CustomHead } from "@/components/utility/custom-head"
import { breakpoints } from "@/lib/utils"
import iceBottom from "@/public/img/ice-bottom.png"
import iceGlass from "@/public/img/ice-glass.png"
import { useMediaQuery } from "usehooks-ts"
import { ClientOnly } from "@/components/isomorphic"
import b1 from "@/public/img/b-1.png"
import b2 from "@/public/img/b-2.png"
import b3 from "@/public/img/b-3.png"
import b4 from "@/public/img/b-4.png"

const Scene = dynamic(() => import("@/components/scene").then((m) => m.Scene), {
  loading: () => (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ),
  ssr: false,
})

export default function Home() {
  const isMobile = useMediaQuery(`(max-width: ${breakpoints.tablet}px)`)

  return (
    <>
      <CustomHead
        canonical="https://chill-owra.com"
        title="Chill Owra"
        description="Chill Owra - Ice Glass"
        keywords={["ice", "ice glass", "drink", "chill", "chill owra"]}
        themeColor="#0075ce"
      ></CustomHead>
      <div
        className={cx(
          s.home,
          "fixed top-0 left-0 w-screen h-full tablet:top-auto tablet:left:auto tablet:relative tablet:h-screen  overflow-hidden"
        )}
      >
        <header className={cx(s.header, "flex items-center justify-center pointer-events-none z-20 relative")}>
          <div className={s.logoC}>
            <OwraLogo />
          </div>
        </header>

        <ClientOnly>
          {!isMobile ? (
            <div className="absolute top-0 left-0 w-full h-full z-10">
              <Scene />
            </div>
          ) : (
            <div className={cx(s.mobile, "fixed top-0 left-0 w-screen h-full flex items-center justify-center")}>
              <div className={s.iceGlassC}>
                <Img alt="Ice Glass" className="object-contain" src={iceGlass} />
              </div>

              <div className={cx(s.iceC, s.b1)}>
                <Img alt="Ice Cube" className="object-contain" src={b4} />
              </div>

              <div className={cx(s.iceC, s.b2)}>
                <Img alt="Ice Cube" className="object-contain" src={b2} />
              </div>

              <div className={cx(s.iceC, s.b3)}>
                <Img alt="Ice Cube" className="object-contain" src={b3} />
              </div>

              <div className={cx(s.iceC, s.b4)}>
                <Img alt="Ice Cube" className="object-contain" src={b1} />
              </div>
            </div>
          )}
        </ClientOnly>

        <Button />

        <div className={s.bottomImgC}>
          <Img alt="Ice Cubes" className="object-contain" src={iceBottom} />
        </div>
      </div>
    </>
  )
}
