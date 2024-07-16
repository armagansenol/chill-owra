import s from "./home/home.module.scss"

import cx from "clsx"

import { OwraLogo } from "@/components/icons/logo"

import Button from "@/components/button"
import { ClientOnly } from "@/components/isomorphic"
import { LoadingSpinner } from "@/components/utility/loading-spinner"
import dynamic from "next/dynamic"

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
    <div className={cx(s.home, "w-screen h-screen relative")}>
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
    </div>
  )
}
