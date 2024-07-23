import { RealViewport } from "@/components/real-viewport"
import { Modal } from "@/components/utility/modal"
import "@/styles/global.scss"
import "@/styles/tailwind-base.css"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <Modal />
      <RealViewport />
    </div>
  )
}
