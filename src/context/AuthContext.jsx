import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
// import { APP_CONFIG } from "../utils/dataEstatica";
// import { UserModel } from "../supabase/user.crud";
// import { useUserStore } from "../stores/user.store";
import { insertSuperAdmin } from "../supabase/auth";
// import { UserModel } from "../supabase/user.crud";


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('session', session)
                if (session == null)
                    setUser(null)
                else {
                    //console.log('session', session.user.user_metadata, session.user.id)
                    setUser(session.user)
                    await insertSuperAdmin(session.user.user_metadata, session.user.id)
                }
            }
        )
        return () => {
            authListener.subscription
        }
    }, [])


    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext)
}