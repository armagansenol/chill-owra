import { create } from "zustand"

interface State {
  theme: "light" | "dark"
  setTheme: (theme: State["theme"]) => void
}

export const useStore = create<State>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme })
  },
}))

export const useThemeStore = useStore
