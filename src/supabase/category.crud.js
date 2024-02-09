//import Swal from "sweetalert2";
import { SupabaseCrud } from "./supabase.crud";
import { consoleError } from "../utils/messages";

export class CategoryModel extends SupabaseCrud {
    storageRoot = "images";
    storagePath = "categories/";

    constructor() {
        super("pv_categories");
    }

    async getAll(p) {
        const data = await super.getByField("id_company", p.id_company);
        return data;
    }

    async insert(p, file = undefined) {
        //const { error, data } = await this.supabase.rpc("insert_category", p);
        console.log('insert.crud', p, file)
        
        const data = await super.insert(p);
        console.log('resp-insert', data)
        if (!data) 
            return { success: false, id: null };

        const new_id = data.id;  
        const img = file?.size;
        if (img === undefined) return { success: true, id: new_id };

        console.log('procesando img....')
        const urlImage = await this.upload_image(file, new_id);
        if (!urlImage) return { success: false, id: new_id };

        const dataUpdate = {
            icon: urlImage.publicUrl,
            id: new_id,
        };
        return { success: await super.update(dataUpdate), id: new_id };
    }

    async upload_image(file, id_category) {
        const root = `categories/${id_category}`;
        const { data, error } = await this.supabase.storage
            .from("images")
            .upload(root, file, {
                upsert: true,
                cacheControl: 0,
            });

        console.log('storage.upload', data, error)

        if (data) {
            const { data: urlImage } = this.supabase.storage
                .from(this.storageRoot)
                .getPublicUrl(root);
            console.log('storage.getpubllic', urlImage)
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

    async delete(p) {
        const success = super.delete(p);
        if (!success || p.icon == null) return success;

        this.error = false
        const path = `${this.storagePath}${p.id}`;
        const {error} = await this.supabase.storage.from(this.storageRoot).remove(path);
        if ( error ) {
            this.error = true
            this.message = error.message
        }
        return this.error
    }
}
