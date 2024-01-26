import { create } from "zustand";
import { UserModel } from "../supabase/user.crud";
import { supabase } from "../supabase/supabase.config";
import { APP_CONFIG, DataModulosConfiguracion } from "../utils/dataEstatica";
import { UserCompanyModel } from "../supabase/userCompany.crud";
import { PermissionModel } from "../supabase/permission.crud";


export const useUserStore = create((set) => ({
    data: [],
    dataAll: [],
    itemSelect: null,
    strSearch: '',
    parameters: {},
    dataPermissions: [],
    dataPermissionsLoggedInUser: [],


    insertAdmin: async (p) => {
        const { data, error } = await supabase.auth.signUp({
            email: p.email,
            password: p.password,
            // options: {
            //     emailRedirectTo: 'https//example.com/welcome'
            // }
        })
        if (error)
            return [null, error.message]

        const oUser = new UserModel()
        const dataUser = await oUser.insert({
            id_auth: data.user.id,
            email: p.email,
            type_user: APP_CONFIG.type_user.admin
        })
        return [dataUser, oUser.error ?? null]
    },

    get: async () => {
        const oUserModel = new UserModel()
        const data = await oUserModel.get()
        set({ data: data })
        return data ?? []
    },

    update: async (p, datacheckPermissions) => {
        const oUserModel = new UserModel()
        if (! await oUserModel.update(p))
            return false

        // delete permissions
        const oPermissionModel = new PermissionModel()
        if (! await oPermissionModel.deleteByUser({ id_user: p.id }))
            return false

        // insert permissions
        let ok = true
        datacheckPermissions.forEach(async (item) => {
            if (item.check) {
                let pPermission = {
                    id_user: p.id,
                    id_module: item.id,
                };
                if (await oPermissionModel.insert(pPermission))
                    ok = false
            }
        });

        set((state) => ({ dataAll: state.getAll(state.parameters) }))

        return ok
    },

    setStrSearch: (p) => {
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new UserModel()
        const data = await oModel.getAll(p)
        set({ dataAll: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectUser: (p) => {
        set({ itemSelect: p })
    },

    filter: async (p) => {
        const oModel = new UserModel()
        const data = await oModel.filter(p)
        set({ dataAll: data })
        return data
    },

    insert: async (pUser, pAuth, id_company, datacheckPermissions) => {
        const oModel = new UserModel()

        // alta auth
        const { data, error } = await oModel.authSignUp(pAuth)
        if (error) {
            console.log('Error:', error.message)
            return false
        }

        // insert User
        const p = pUser
        p.state = APP_CONFIG.states.activo
        p.id_auth = data.user.id

        const newUser = await oModel.insert(p)

        if (!newUser) return false

        // insert user_company (asignacion)
        const oUserCompanyModel = new UserCompanyModel()
        const dataUserCompany = await oUserCompanyModel.insert({
            id_user: newUser[0].id,
            id_company: id_company
        })

        if (!dataUserCompany) return false

        // insert permissions
        let ok = true
        const oPermissionModel = new PermissionModel()
        datacheckPermissions.forEach(async (item) => {
            if (item.check) {
                let p = {
                    id_user: newUser[0].id,
                    id_module: item.id,
                };
                if (await oPermissionModel.insert(p))
                    ok = false
            }
        });

        // signOut
        await oModel.authSignOut()

        return ok
    },

    getPermissions: async (p) => {
        const oPermissionModel = new PermissionModel()
        const dataPermissions = await oPermissionModel.getAllByUser(p)
        set({ dataPermissions: dataPermissions })

        // agregar propiedad isPermission a DataModulesConfiguration
        // const result = DataModulosConfiguracion.map(modulo => {
        //     const isPermission = dataPermissions?.some(permiso =>
        //         permiso.inv_modules.name === modulo.title
        //     )
        //     return {
        //         ...modulo,
        //         isPermission: isPermission
        //     };
        // });
        // DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length)
        // DataModulosConfiguracion.push(...result)

        return dataPermissions
    },

    getPermissionsLoggedInUser: async (p) => {
        const oPermissionModel = new PermissionModel()
        const dataPermissions = await oPermissionModel.getAllByUser(p)
        set({ dataPermissionsLoggedInUser: dataPermissions })

        // agregar propiedad isPermission a DataModulesConfiguration
        const result = DataModulosConfiguracion.map(modulo => {
            const isPermission = dataPermissions?.some(permiso =>
                permiso.inv_modules.name === modulo.title
            )
            return {
                ...modulo,
                isPermission: isPermission
            };
        });
        DataModulosConfiguracion.splice(0, DataModulosConfiguracion.length)
        DataModulosConfiguracion.push(...result)

        return dataPermissions
    }

}))