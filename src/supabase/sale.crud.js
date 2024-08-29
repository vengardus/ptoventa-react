import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class SaleModel extends SupabaseCrud {
    constructor() {
        super("pv_sales");
    }

    // async insert(p) {
    //     const data = await this.supabase.rpc("insert_product", p );
    //     this.error = data.error? true: false
    //     this.message = this.error? this.error.message : ''
    //     this.status = data.status
    //     return data.data
    // }

    // async update(p) {
    //     const data = await this.supabase.rpc("update_product", p );
    //     this.error = data.error? true: false
    //     this.message = this.error? this.error.message : ''
    //     this.status = data.status
    //     return data.data
    // }

    async getAll(p, order = false) {
        const { data, error, status } = await this.supabase
            .from(this.TABLE_NAME)
            .select(`*, pv_customers(id, name)`)
            .eq("id_company", p.id_company)
            .order("id", { ascending: order });

        this.error = error != null;
        this.status = status;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SaleModel.name}.${this.getByField.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data?.length > 0 ? data : null;
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select(`*, pv_customers(id, name)`)
            .eq("id_company", p.id_company)
            .ilike("name", "%" + p.description + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SaleModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
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
