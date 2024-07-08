import { CursorType, Media } from "@/types"
import { create } from "zustand"

interface State {
  type: CursorType
  visible: boolean
  toggleVisibility: () => void
  setCursor: (type: CursorType) => void
  events: any
  media: Media | null
  setMedia: (type: Media | null) => void
  reset: () => void
}

const useStore = create<State>((set, get) => ({
  type: "default",
  visible: false,
  media: null,
  setMedia: (media) => set({ media }),
  toggleVisibility: () => set({ visible: !get().visible }),
  setCursor: (type) => set({ type }),
  reset: () => {
    get().setCursor("default")
    if (get().media !== null) get().setMedia(null)
  },
  events: {
    cursorClick: {
      onMouseEnter: () => get().setCursor("click"),
      onMouseLeave: () => get().reset(),
    },
    cursorHide: {
      onMouseEnter: () => get().setCursor("hide"),
      onMouseLeave: () => get().reset(),
    },
    cursorMedia: (media: Media) => {
      return {
        onMouseMove: () => {
          if (get().type === "media") {
            return
          }
          console.log("lol")

          get().setMedia(media)
          get().setCursor("media")
        },
        onMouseOut: () => {
          get().reset()
        },
      }
    },
  },
}))

export const useCursorStore = useStore
