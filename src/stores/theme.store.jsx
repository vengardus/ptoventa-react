import { create } from "zustand";
import { APP_CONFIG } from "../utils/dataEstatica";
import { Dark, Light } from "../styles/themes";

export const useThemeStore = create((set) => ({
    theme: APP_CONFIG.theme.dark,
    themeStyle: Dark,

    setTheme: () => {
        set((state) => ({themeStyle: state.theme===APP_CONFIG.theme.dark? Light : Dark}))
        set((state) => ({theme: state.theme===APP_CONFIG.theme.dark? APP_CONFIG.theme.light : APP_CONFIG.theme.dark}))
    }

}))