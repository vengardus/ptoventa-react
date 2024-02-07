import { create } from "zustand";
import { CompanyModel } from "../supabase/company.crud";


export const useCompanyStore = create((set) => ({
    data: null,
    countUsersCompany: 0,

    getByUser: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.getByUser(p)
        set({ data: data})
        return data?? []
    },

    getCountUsersCompany: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.getCountUserByCompany({
            id_company: p.id_company
        })
        set({ countUsersCompany: data ?? 0 })
        return data ?? 0
    },


    getAll: async () => {
        const oModel = new CompanyModel()
        const data = await oModel.getAll()
        set({ data: data })
        return data
    },

    insert: async (p) => {
        const oModel = new CompanyModel()
        const data = await oModel.insert(p)
        if (data)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))

        return { data, errorMessage: oModel.message}
    },

}))