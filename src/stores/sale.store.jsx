import { create } from "zustand";
import { SaleModel } from "../supabase/sale.crud";


export const useSaleStore = create((set) => ({
    data: null,
    itemSelect: null,
    strSearch: '',
    parameters: {},

    setStrSearch: (p) => {
        set({ strSearch: p })
    },

    getAll: async (p) => {
        const oModel = new SaleModel()
        const data = await oModel.getAll(p)
        set({ data: data })
        set({ itemSelect: data ? data[0] : null })
        set({ parameters: p })
        return data
    },

    selectSale: (p) => {
        set({ itemSelect: p })
    },

    insert: async (p, file) => {
        const oModel = new SaleModel()
        const success = await oModel.insert(p, file)

        if (success)
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        return { success, message: oModel.message }
    },

    delete: async (p) => {
        const oModel = new SaleModel()
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
        const oModel = new SaleModel()
        const success = await oModel.update(p, file)
        
        if (success) {
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        }
        return { success, message: oModel.error ? oModel.message : null }
    },

    filter: async (p) => {

        const oModel = new SaleModel()
        const data = await oModel.filter(p)
        set({ data: data })
        return true
    }
}))