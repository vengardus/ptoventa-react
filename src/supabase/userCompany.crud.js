import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";


export class UserCompanyModel extends SupabaseCrud {
    constructor() {
        super("inv_user_company");
    }

    async insert(p) {
        const data = await super.insert(p);
        if (this.error)
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar usuario-compañia: ${this.message}`,
                showConfirmButton: false,
                //timer: 1500,
            });
        return data
    }


}
