import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class PermissionModel extends SupabaseCrud {
    constructor() {
        super("inv_permissions");
    }

    async getAllByUser(p) {
        const {data} = await this.supabase.from('inv_permissions')
            .select('id, id_user, id_module, inv_modules(name)')
            .eq("id_user", p.id_user);
        return data
    }

    async insert(p) {
        const data = await super.insert(p);
        if (this.error)
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar permiso: ${this.message}`,
                showConfirmButton: false,
                //timer: 1500,
            });
        return data;
    }

    async deleteByUser(p) {
        console.log('delete.permisssion.crud', p)
        try {
            const { error } = await this.supabase
                .from(this.TABLE_NAME)
                .delete()
                .eq("id_user", p.id_user)
            this.error = error != null;
            if (this.error) {
                this.message = error.message;
                consoleError(
                    `${PermissionModel.name}.${this.delete.name}.${this.TABLE_NAME}: ${error.message}`
                );
            }
            return !this.error
        }
        catch(error) {
            consoleError('Error delete', error.error_description || error.message );
            return false
        }
    }

    async update(p) {
        await super.update(p);
        if (!this.error)
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: "Datos modificados",
                showConfirmButton: false,
                timer: 1500,
            });
    }
}
