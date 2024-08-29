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

        // para el dataSelect
        data.forEach(item => {item.description=item.name})

        return data
    },

    selectProduct: (p) => {
        set({ itemSelect: p })
    },

    // insert: async (p, stockBranches) => {
    //     const oModel = new ProductModel()
    //     const data = await oModel.insert(p)


    //     if (oModel.error) {
    //         if (oModel.status == APP_CONFIG.errorCodes.alreadyExist)
    //             oModel.message = 'Descripción de producto ya existe.'
    //     }
    //     else {
    //         const id_product = data.id
    //         if (stockBranches) {
    //             const stocks = stockBranches.map(item => ({
    //                 id_branch: item.id_branch,
    //                 id_product: id_product,
    //                 stock: item.stock,
    //                 stock_min: item.stock_min
    //             }))
    //             console.log('Insertará stocks:', stocks)
    //             const oModelWarehouse = new WarehouseModel()
    //             const data = await oModelWarehouse.insert2(stocks)
    //             console.log('resp insert warehouses', data, oModelWarehouse.error, oModelWarehouse.message)
    //         }

    //         set((state) => ({
    //             data: state.getAll(state.parameters)
    //         }))
    //     }
    //     return { success: !oModel.error, message: oModel.message }
    // },


    insert: async (p, stockBranches) => {
        let stocks = []

        if (stockBranches) {
            stocks = stockBranches.map(item => ({
                id_branch: item.id_branch,
                stock: parseFloat(item.stock),
                stock_min: parseFloat(item.stock_min)
            }))
        }

        p.branch_stocks = stocks
        console.log('Insertará stocks:', p)

        const oModel = new ProductModel()
        await oModel.insert(p)

        if (oModel.error) {
            if (oModel.status == APP_CONFIG.errorCodes.alreadyExist)
                oModel.message = 'Descripción de producto ya existe.'
        }
        else {
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        }
        return { success: !oModel.error, message: oModel.message }
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

    update: async (p, stockBranches) => {
        let stocks = []

        if (stockBranches) {
            stocks = stockBranches.map(item => ({
                id_branch: item.id_branch,
                stock: parseFloat(item.stock),
                stock_min: parseFloat(item.stock_min)
            }))
        }

        p.branch_stocks = stocks
        console.log('Actualizará stocks:', p)

        const oModel = new ProductModel()
        await oModel.update(p)

        if (oModel.error) {
            if (oModel.status == APP_CONFIG.errorCodes.alreadyExist)
                oModel.message = 'Descripción de producto ya existe.'
        }
        else {
            set((state) => ({
                data: state.getAll(state.parameters)
            }))
        }
        return { success: !oModel.error, message: oModel.message }
    },


    filter: async (p) => {

        const oModel = new ProductModel()
        const data = await oModel.filter(p)
        set({ data: data })

        // para el dataSelect
        data.forEach(item => {item.description=item.name})

        return true
    }
}))