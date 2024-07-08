import { NextSeoProps } from "next-seo"
import { StaticImageData } from "next/image"

export interface Seo {
  title: NextSeoProps["title"]
  description: NextSeoProps["description"]
}

export type CursorType = "default" | "click" | "media" | "hide"

export interface Filter {
  ui: string
  type: string
}

export interface Social {
  icon: any
  ui: string
  url: string
}

export interface Media {
  type: MediaType
  src: string | StaticImageData
  height?: number
  width?: number
}

export enum MediaType {
  image = "image",
  video = "video",
}

export enum PageTransitionPhase {
  IDLE = "IDLE",
  APPEAR = "APPEAR",
  IN = "IN",
  OUT = "OUT",
}

export enum Size {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export interface CardFloatProps {
  icon: string
  description: string
  button?: {
    text: string
    url: string
  }
}
