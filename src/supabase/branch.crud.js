import { SupabaseCrud } from "./supabase.crud";

export class BranchModel extends SupabaseCrud {
    constructor() {
        super("pv_branches")       
    }
}