import { SupabaseCrud } from "./supabase.crud";

export class RoleModel extends SupabaseCrud {
    constructor() {
        super("pv_roles");
    }
}