import { create } from "zustand";
import { WarehouseModel } from "../supabase/warehouse.crud";


export const useRegisterProductStore = create((set, get) => ({
    isWarehouse: false,
    isMultiPrices: false,
    unitSaleSelect: null,
    categorySelect: null,
    stockBranches: [],
    /*  
    {
        id,
        id_branch,
        branch_name,
        stock,
        stock_min
    }
    */
    branchSelect: null,

    getIsWarehouse: () => {
        return get().isWarehouse
    },
    setIsWarehouse: (value) => {
        set({ isWarehouse: value })
    },

    getIsMultiPrices: () => {
        return get().isMultiPrices
    },
    setIsMultiPrices: (value) => {
        set({ isMultiPrices: value })
    },

    getUnitSaleSelect: () => {
        return get().unitSaleSelect
    },
    setUnitSaleSelect: (value) => {
        console.log('store.setUnitSaleSelect', value)
        set({ unitSaleSelect: value })
        console.log('store-post-set-get', get().getUnitSaleSelect())
    },

    getCategorySelect: () => {
        return get().categorySelect
    },
    setCategorySelect: (value) => {
        set({ categorySelect: value })
    },

    getStockBranches: () => {
        return get().stockBranches
    },

    addStockBranches: (newItem, isArray = false) => {
        console.log('add', newItem)

        if (!isArray)
            set(state => ({
                stockBranches:
                    [...state.stockBranches.filter(item => item.id_branch != newItem.id_branch),
                        newItem]
            }))
        else
            set(state => ({
                stockBranches:
                    [...state.stockBranches.filter(item => item.id_branch != newItem.id_branch),
                        ...newItem]
            }))
    },

    deleteStockBranches: () => {
        set({ stockBranches: [] })
    },

    setBranchSelect: (item) => {
        console.log('set branch', item)
        set({ branchSelect: item })
    },

    getByCompanyProduct_Warehouse: async (id_company, id_product) => {
        const p = {
            p_id_company: id_company,
            p_id_product: id_product
        }
        const oModel = new WarehouseModel()
        const data = await oModel.getByCompanyProduct(p)
        console.log('resp store getWarehouse', data)

        if (!oModel.error) {
            const stocks = data.map(item => ({
                id: item.id_branch,
                id_branch: item.id_branch,
                branch_name: item.branch_name,
                stock: item.stock,
                stock_min: item.stock_min
            }))

            const add = get().addStockBranches
            console.log('add stocks!', stocks)
            add(stocks, true)

            const get1 = get().getStockBranches
            console.log('stoks-load', get1())
        }

        return { success: !oModel.error, message: oModel.message }
    }

}))