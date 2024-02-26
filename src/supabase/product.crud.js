import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class ProductModel extends SupabaseCrud {
    constructor() {
        super("pv_products");
    }

    async getAll(p, order=false) {
        //const data = await this.getByField("id_company", p.id_company);
        const { data, error, status } = await this.supabase
        .from(this.TABLE_NAME)
        .select(`*, pv_categories(id, description)`)
        .eq("id_company", p.id_company)
        .order('id', {ascending:order});

        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.getByField.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data?.length > 0 ? data : null;
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select(`*, pv_categories(id, description)`)
            .eq("id_company", p.id_company)
            .ilike("name", "%" + p.description + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${ProductModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }

    // async insert1(p) {
    //     console.log("pre insert rpc", p);
    //     const { data, error, status } = await this.supabase.rpc(
    //         "insert_product",
    //         p
    //     );
    //     console.log("post insert rpc", data, error, status);
    //     this.error = error;
    //     this.status = status;
    //     if (this.error) this.message = error.message

    //     return this.error? data: p;
    // }
}
