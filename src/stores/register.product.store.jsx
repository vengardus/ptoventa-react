import { create } from "zustand";


export const useRegisterProductStore = create((set, get) => ({
    isWarehouse: false,
    isMultiPrices: false,
    unitSaleSelect: null,
    categorySelect: null,
    stockBranches: [],
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

    addStockBranches: (newItem) => {
        console.log('add', newItem)
        set(state => ({
            stockBranches:
                [...state.stockBranches.filter(item => item.id_branch != newItem.id_branch),
                    newItem]
        }))
    },

    setBranchSelect: (item) => {
        console.log('set branch', item)
        set({ branchSelect: item })
    }

}))