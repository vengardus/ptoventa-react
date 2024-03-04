import { useMutation } from "@tanstack/react-query";
import { useRegisterProductStore } from "../stores/register.product.store";
import { APP_CONFIG } from "../utils/dataEstatica";
import { convertirCapitalize } from "../utils/conversiones";
import { useProductStore } from "../stores/product.store";


export const useProductMutation = ({
    action,
    dataSelect,
    closeForm,
    id_company
}
) => {

    const mutationRegisterProduct = useMutation({
        mutationKey: ["register_Product"],
        mutationFn: async (data) => registerProduct(data),
        onError: (err) => console.log("Ocurrió un error", err.message),
    });

    const insertProduct = useProductStore(state => state.insert)
    const updateProduct = useProductStore(state => state.update)

    const getIsWarehouse = useRegisterProductStore(state => state.getIsWarehouse)
    const getIsMultiPrices = useRegisterProductStore(state => state.getIsMultiPrices)
    const getUnitSaleSelect = useRegisterProductStore(state => state.getUnitSaleSelect)
    const getCategorySelect = useRegisterProductStore(state => state.getCategorySelect)
    const getStockBranches = useRegisterProductStore(state => state.getStockBranches)

    async function registerProduct(data) {
        let ok = false
        let message = ''

        if (action == APP_CONFIG.actionCrud.update) {
            const p = {
                p_id: dataSelect.id,
                p_name: convertirCapitalize(data.name),
                p_price_sale: parseFloat(data.price_sale),
                p_price_buy: parseFloat(data.price_buy),
                p_id_category: getCategorySelect().id,
                p_barcode: data.barcode,
                p_cod: data.cod,
                p_id_company: id_company,
                p_unit_sale: getUnitSaleSelect().id,
                p_stock_min: parseFloat(data.stock_min),
                p_is_warehouse: getIsWarehouse(),
                p_is_multi_prices: getIsMultiPrices(),
            };
            console.log('UPDATE', p)
            const stocksBranches= getIsWarehouse()? getStockBranches() : null
            const { success, message:messageUpdate } = await updateProduct(p, stocksBranches)
            
            if (success) ok = success
            else message = messageUpdate
        }

        else {
            const p = {
                p_name: convertirCapitalize(data.name),
                p_price_sale: parseFloat(data.price_sale),
                p_price_buy: parseFloat(data.price_buy),
                p_id_category: getCategorySelect().id,
                p_barcode: data.barcode,
                p_cod: data.cod,
                p_id_company: id_company,
                p_unit_sale: getUnitSaleSelect().id,
                p_stock_min: parseFloat(data.stock_min),
                p_is_warehouse: getIsWarehouse(),
                p_is_multi_prices: getIsMultiPrices(),
            };

            const stocksBranches= getIsWarehouse()? getStockBranches() : null
            const { success, message:messageInsert } = await insertProduct(p, stocksBranches)
            
            if (success) ok = success
            else message = messageInsert
        }

        closeForm(ok, message);
        return ok

    }





    return mutationRegisterProduct

}

