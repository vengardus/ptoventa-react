import { create } from "zustand";
import { BrandModel } from "../supabase/brand.crud";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useBrandStore = create((set) => ({
    data: null,
    itemSelect: null,
    strSearch: '',
    parameters: {},

    setStrSearch: (p) => {
        //console.log('setStrSearch', p)
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new BrandModel()
        const data = await oModel.getAll(p)
        set({ data: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectBrand: (p) => {
        set({ itemSelect: p })
    },

    insert: async (p, file) => {
        const oModel = new BrandModel()
        const success = await oModel.insert(p, file)

        if (oModel.status == APP_CONFIG.errorCodes.alreadyExist) 
            oModel.message = 'Descripción de marca ya existe.'

        if (success)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return { success, message: oModel.message }
    },

    delete: async (p) => {
        const oModel = new BrandModel()
        const ok = await oModel.delete(p)
        if (ok)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        else
            console.log('delete error', oModel.message)
        return ok
    },

    update: async (p, file) => {
        const oModel = new BrandModel()
        const success = await oModel.update(p, file)
        
        if (oModel.status == APP_CONFIG.errorCodes.alreadyExist) 
            oModel.message = 'Descripción de marca ya existe.'

        if (success) {
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        }
        return { success, message: oModel.error ? oModel.message : null }
    },

    filter: async (p) => {

        const oModel = new BrandModel()
        const data = await oModel.filter(p)
        set({ data: data })
        return true
    }
}))