import { create } from "zustand";
import { ProductModel } from "../supabase/product.crud";
import { APP_CONFIG } from "../utils/dataEstatica";


export const useProductStore = create((set) => ({
    data: null,
    itemSelect: null,
    strSearch: '',
    parameters: {},

    setStrSearch: (p) => {
        //console.log('setStrSearch', p)
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new ProductModel()
        const data = await oModel.getAll(p)
        set({ data: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectProduct: (p) => {
        set({ itemSelect: p })
    },

    insert: async (p) => {
        const oModel = new ProductModel()
        const resp = await oModel.insert(p)
        console.log('store-resp', resp)

        if (oModel.status == APP_CONFIG.errorCodes.alreadyExist) {
            oModel.message = 'Descripción de producto ya existe.'
        }

        if (!oModel.error)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return { success: oModel.error, message: oModel.message }
    },

    delete: async (p) => {
        const oModel = new ProductModel()
        const ok = await oModel.delete(p)
        if (ok)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        else
            console.log('delete error', oModel.message)
        return ok
    },

    update: async (p) => {
        const oModel = new ProductModel()
        const success = await oModel.update(p)
        
        if (oModel.status == APP_CONFIG.errorCodes.alreadyExist) 
            oModel.message = 'Descripción de producto ya existe.'

        if (success) {
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        }
        return { success, message: oModel.error ? oModel.message : null }
    },

    filter: async (p) => {

        const oModel = new ProductModel()
        const data = await oModel.filter(p)
        set({ data: data })
        return true
    }
}))