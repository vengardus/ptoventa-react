import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";


export class KardexModel extends SupabaseCrud {
    constructor() {
        super("inv_kardex");
    }

    async getAll(p) {
        const { data } = await this.supabase.rpc("get_all_kardex_by_company", p);
        return data
    }

    async insert(p) {
        const data = await super.insert(p);
        if (this.error)
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar movimiento: ${this.message}`,
                showConfirmButton: false,
                // timer: 2000,
            });
        return data;
    }

    // async filter(p) {
    //     const { data, error } = await this.supabase
    //         .from(this.TABLE_NAME)
    //         .select()
    //         .eq("id_company", p.id_company)
    //         .ilike("detail", "%" + p.detail + "%");

    //     this.error = error != null;
    //     if (this.error) {
    //         this.message = error.message;
    //         consoleError(
    //             `${KardexModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
    //         );
    //     }

    //     return data
    // }

    async filter(p) {
        const { data } = await this.supabase.rpc("get_filter_kardex_by_product", p);

        return data
    }

    
}
