import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class ProductModel extends SupabaseCrud {
    constructor() {
        super("pv_products");
    }

    // async getAll(p) {
    //     const { data } = await this.supabase.rpc("get_all_products", p);
    //     return data
    // }

    async getAll(p) {
        const data = await this.getByField('id_company', p.id_company)
        return data
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select()
            .eq("id_company", p.id_company)
            .ilike("name", "%" + p.description + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${ProductModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data
    }
    
}
