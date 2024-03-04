import { SupabaseCrud } from "./supabase.crud";

export class WarehouseModel extends SupabaseCrud {
    constructor() {
        super('pv_warehouses')
    }

    async getByCompanyProduct(p) {
        const data = await this.supabase.rpc('get_warehouses_by_company_product', p)
        console.log('resp getByCompanyProduct', data)
        this.error = data.error? true: false
        this.message = this.error? this.error.message : ''
        this.status = data.status
        return data.data
    }
}