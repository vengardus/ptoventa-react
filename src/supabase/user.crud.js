import Swal from "sweetalert2";
import { getIdAuthSupabase } from "./auth";
import { SupabaseCrud } from "./supabase.crud";

export class UserModel extends SupabaseCrud {
    constructor() {
        super("pv_users");
    }

    async authSignUp(p) {
        const { data, error } = await this.supabase.auth.signUp({
            email: p.email,
            password: p.password
        })
        return {data, error}
    }

    async authSignOut() {
        await this.supabase.auth.signOut();
    }


    async getByIdAuth(id_auth=undefined) {
        console.log('getByIdAuth', id_auth)
        let idAuthSupabase = ''
        if ( id_auth === undefined) {
            idAuthSupabase = await getIdAuthSupabase();
            console.log('undefined=>', idAuthSupabase)
            if ( idAuthSupabase == null )
                idAuthSupabase = ''
        }
        else {
            idAuthSupabase = id_auth
        }
        const data = await super.getByField("id_auth", idAuthSupabase);
        console.log('getByIdAuth-getByField', idAuthSupabase, data)
        return data ? data[0] : null;
    }

    async insert(p) {
        const data = await super.insert(p);
        if (this.error)
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: "Oops",
                text: `Error al insertar usuario: ${this.message}`,
                showConfirmButton: false,
                //timer: 1500,
            });
        return data;
    }

    async update(p) {
        console.log('update.crud', p)
        await super.update(p);
        if (!this.error)
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: "Datos modificados",
                showConfirmButton: false,
                timer: 1500,
            });
        return !this.error
    }

    async getAll(p) {
        const { data } = await this.supabase.rpc("get_all_users", p);
        return data
    }

    async filter(p) {
        const { data } = await this.supabase.rpc("get_filter_users", p);

        return data
    }

    async insertSuperadmin(p) {
        console.log('insert_superadmin', p)
        const  data  = await this.supabase.rpc("insert_superadmin", p);
        return data
    }
}
