import { APP_CONFIG } from "../utils/dataEstatica"
import { RoleModel } from "./role.crud"
import { supabase } from "./supabase.config"
import { UserModel } from "./user.crud"

export const getIdAuthSupabase = async() => {
    const {data:{session}} = await supabase.auth.getSession()
    console.log('getID', session)
    if (session == null ) return null
    const {user} = session
    const idAuthSupabase = user.id
    return idAuthSupabase
}

export const insertSuperAdmin = async(userMetadata, idAuthSupabase) => {
    const oUserModel = new UserModel()
    console.log('start insert', userMetadata, idAuthSupabase)
    if ( await oUserModel.getByIdAuth(idAuthSupabase) ) {
        console.log('Usuario superadmin ya fue registrado')
        return
    }

    const oRoleModel = new RoleModel()
    const data = await oRoleModel.getByField('cod', APP_CONFIG.defaultValues.codSuperadmin)
    if ( ! data )
        return {data:null, messageError:'Rol no encontrado.'}

    const p = {
        p_id_auth: idAuthSupabase,
        p_id_role: data[0].id,
        p_email: userMetadata.email,
        p_currency_symbol: APP_CONFIG.defaultValues.currencySymbol,
        p_company_name: APP_CONFIG.defaultValues.genericDescription,
        p_doc_type_name: APP_CONFIG.defaultValues.genericDescription
    }
    console.log('ISA p', p)

    const resp = await oUserModel.insertSuperadmin(p)
    console.log('ISA resp', resp)
}
