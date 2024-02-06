import { create } from "zustand";
import { ModuleModel } from "../supabase/module.crud";

export const useModuleStore = create((set) => ({
    data: [],

    getAll: async () => {
        const oModel = new ModuleModel()
        const data = await oModel.getAll()
        set({ data: data ?? [] })
        return data ?? []
    }

})) 