import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";
import { supabase } from "../supabase/supabase.config";
// import { UserModel } from "../supabase/user.crud";


const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session == null)
                    setUser(null)
                else {
                    //console.log(session)
                    setUser(session.user)
                }
            }
        )
        return () => {
            authListener.subscription
        }
    }, [])

    // const _userInsert = async (dataProvider, idAuthSupabase) => {
    //     const p = {
    //         username: dataProvider.name,
    //         photo: dataProvider.picture,
    //         idauth_supabase: idAuthSupabase
    //     }
    //     const oUserModel = new UserModel()
    //     if (!await oUserModel.getByField('name', p.username))
    //         await oUserModel.insert(p)
    // }

    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext)
}