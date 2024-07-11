import s from "./home/home.module.scss"

import cx from "clsx"

import { OwraLogo } from "@/components/icons/logo"

import Button from "@/components/button"
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
  return (
    <div className={cx(s.home, "w-screen h-screen relative")}>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <ClientOnly>
          <GravityRectangle />
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
