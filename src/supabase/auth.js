import { supabase } from "./supabase.config"

export const getIdAuthSupabase = async() => {
    const {data:{session}} = await supabase.auth.getSession()
    
    if (session == null ) return null
    const {user} = session
    const idAuthSupabase = user.id
    return idAuthSupabase
}
