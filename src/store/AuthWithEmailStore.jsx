import { create } from "zustand"
import { supabase } from "../supabase/supabase.config";
import { consoleError } from "../utils/messages";


export const useAuthWithEmailStore = create((set) => ({
    isAuth: false,

    signInWithEmail: async (p) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: p.email,
                password: p.password
            })

            if (error) {
                consoleError('Ocurrió un error durante la autenticación:'+ error.message)
                return null
            }

            set({ isAuth: true })

            return data
        }
        catch (error) {
            consoleError(error, useAuthWithEmailStore.name)
            return null
        }
    },

    signOut: async () => {
        console.log('signout')
        const { error } = supabase.auth.signOut()
        if (error) throw new error('Ocurrió un error durante el cierre de sesión')
        else console.log('ok')
        set({ isAuth: false })
    }
}))