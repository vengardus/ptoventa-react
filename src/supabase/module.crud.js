import { SupabaseCrud } from "./supabase.crud";

export class ModuleModel extends SupabaseCrud {
    constructor() {
        super("pv_modules");
    }
}
