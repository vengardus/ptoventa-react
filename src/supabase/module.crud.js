import { SupabaseCrud } from "./supabase.crud";

export class ModuleModel extends SupabaseCrud {
    constructor() {
        super("inv_modules");
    }
}
