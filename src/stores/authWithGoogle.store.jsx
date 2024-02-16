import { create } from "zustand"
import { supabase } from "../supabase/supabase.config";
import { consoleError } from "../utils/messages";


export const useAuthWithGoogleStore = create((set) => ({
    isAuth: false,

    signInWithGoogle: async () => {
        console.log('login')
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: "google"
            })

            if (error) throw new error('Ocurrió un error durante la autenticación.')

            set({ isAuth: true })
            console.log('AUTH', data)
            return data
        }
        catch (error) {
            consoleError(error, useAuthWithGoogleStore.name)
        }
    },

    signOut: async () => {
        const { error } = supabase.auth.signOut()
        if (error) throw new error('Ocurrió un error durante el cierre de sesión')

        set({ isAuth: false })
    }
}))