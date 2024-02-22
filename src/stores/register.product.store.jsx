import { create } from "zustand";
import { SaleUnitsData } from "../utils/dataEstatica";


export const useRegisterProductStore = create((set, get) => ({
    isWarehouse: false,
    isMultiPrices: false,
    unitSaleSelect: null, //SaleUnitsData[0],
    categorySelect: null,


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
        //const value = get().unitSaleSelect
        //console.log('store.getUnitSaleSelect', value)
        return get().unitSaleSelect
    },
    setUnitSaleSelect: (value) => {
        console.log('store.setUnitSaleSelect', value)
        set({ unitSaleSelect: value })
        console.log('store-post-set-get', get().getUnitSaleSelect())
    },

    getCategorySelect: () => {
        //console.log('GET-CAT', get().categorySelect)
        return get().categorySelect
    },
    setCategorySelect: (value) => {
        //console.log('SET-CAT', value)
        set({ categorySelect: value })
    }

}))