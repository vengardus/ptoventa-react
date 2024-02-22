import { SupabaseCrud } from "./supabase.crud";

export class ModuleModel extends SupabaseCrud {
    constructor() {
        super("pv_modules");
    }

    async getAll() {
        const data = await super.getAll()
        console.log('Module-gteAll', data)
        return data
    }
}
