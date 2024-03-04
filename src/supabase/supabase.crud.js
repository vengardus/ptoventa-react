import { consoleError } from "../utils/messages";
import { supabase } from "./supabase.config";

export class SupabaseCrud {
    constructor(table_name) {
        this.TABLE_NAME = table_name
        this.message = ""
        this.error = false
        this.status = 0
        this.supabase = supabase;
    }

    async getAll() {
        const { data, error, status } = await supabase.from(this.TABLE_NAME).select();
        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.getAll.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }

    async getByField(fieldName, value, order=true) {
        const { data, error, status } = await supabase
            .from(this.TABLE_NAME)
            .select()
            .eq(fieldName, value)
            .order('created_at', {ascending:order});
        // .maybeSingle();
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

    async insert(p) {
        const { data, error, status } = await supabase
            .from(this.TABLE_NAME)
            .insert(p)
            .select()
            .maybeSingle();

        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.insert.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }

    async insert2(p) {
        const { data, error, status } = await supabase
            .from(this.TABLE_NAME)
            .insert(p)
            .select()

        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.insert.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data;
    }


    async update(p) {
        const { error, status } = await supabase
            .from(this.TABLE_NAME)
            .update(p)
            .eq("id", p.id);

        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.update.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }
        return !this.error
    }

    async delete(p) {
        try {
            const { error, status } = await supabase
                .from(this.TABLE_NAME)
                .delete()
                .eq("id", p.id)
                .single()

            this.error = error != null;
            this.status = status
            if (this.error) {
                this.message = error.message;
                consoleError(
                    `${SupabaseCrud.name}.${this.delete.name}.${this.TABLE_NAME}: ${error.message}`
                );
            }
            return !this.error
        }
        catch(error) {
            consoleError('Error delete', error.error_description || error.message );
            return false
        }
    }

    async filter(fieldName, value) {
        const { data, error, status } = await supabase
            .from(this.TABLE_NAME)
            .select()
            .ilike(fieldName, "%" + value + "%");

        this.error = error != null;
        this.status = status
        if (this.error) {
            this.message = error.message;
            consoleError(
                `${SupabaseCrud.name}.${this.filter.name}.${this.TABLE_NAME}: ${error.message}`
            );
        }

        return data
    }
}
