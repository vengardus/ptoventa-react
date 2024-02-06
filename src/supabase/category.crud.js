//import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class CategoryModel extends SupabaseCrud {
    constructor() {
        super("pv_categories");
    }

    async getAll(p) {
        const data = await this.getByField("id_company", p.id_company);
        return data;
    }

    async insert(p, file = undefined) {
        const { error, data } = await this.supabase.rpc("insert_category", p);
        if (error) {
            this.error = true;
            this.message = error.message;
            // Swal.fire({
            //     icon: "error",
            //     title: "Oops",
            //     text: `Error al insertar categoría: ${error.message}`,
            // });
            return [false, null];
        }

        const new_id = data;
        const img = file.size;
        if (img === undefined) 
            return [true, new_id];

        const urlImage = await this.upload_image(file, new_id);
        if ( ! urlImage )
            return [false, new_id]

        const dataUpdate = {
            icon: urlImage.publicUrl,
            id: new_id,
        };
        return [this.update(dataUpdate), new_id];
    }

    async upload_image(file, id_category) {
        const root = `categories/${id_category}`;
        const { data, error } = await this.supabase.storage
            .from("images")
            .upload(root, file, {
                upsert: true,
                cacheControl: 0,
            });

        if (data) {
            const { data: urlImage } = this.supabase.storage
                .from("images")
                .getPublicUrl(root);
            return urlImage;
        }

        if (error) this.message = error.message;
        return null;
    }

    async filter(p) {
        const { data, error } = await this.supabase
            .from(this.TABLE_NAME)
            .select()
            .eq("id_company", p.id_company)
            .ilike("description", "%" + p.description + "%");

        this.error = error != null;
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${CategoryModel.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }
}
