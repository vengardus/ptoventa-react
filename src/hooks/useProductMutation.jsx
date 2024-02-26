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
    //const getStockBranches = useRegisterProductStore(state => state.getStockBranches)

    async function registerProduct(data) {
        let resp = null

        if (action == APP_CONFIG.actionCrud.update) {
            const p = {
                id:dataSelect.id,
                name: convertirCapitalize(data.name),
                price_sale: parseFloat(data.price_sale),
                price_buy: parseFloat(data.price_buy),
                id_category: getCategorySelect().id,
                barcode: data.barcode,
                cod: data.cod,
                unit_sale: getUnitSaleSelect().id,
                stock_min: parseFloat(data.stock_min),
                is_warehouse: getIsWarehouse(),
                is_multi_prices: getIsMultiPrices(),
            };
            console.log('UPDATE', p)
            resp = await updateProduct(p)
            
            const isWarehouse = getIsWarehouse()
            if (!isWarehouse && dataSelect.is_warehouse)
                console.log('DELETE STOCKS')
            else if (isWarehouse && !dataSelect.is_warehouse)
                console.log('INSERT STOCKS')
            else if (isWarehouse && dataSelect.is_warehouse)
                console.log('DELETE AND SAVE STOCKS')
        }

        else {
            const p = {
                name: convertirCapitalize(data.name),
                price_sale: parseFloat(data.price_sale),
                price_buy: parseFloat(data.price_buy),
                id_category: getCategorySelect().id,
                barcode: data.barcode,
                cod: data.cod,
                id_company: id_company,
                unit_sale: getUnitSaleSelect().id,
                stock_min: parseFloat(data.stock_min),
                is_warehouse: getIsWarehouse(),
                is_multi_prices: getIsMultiPrices(),
            };
            console.log('INSERT', p)
            resp = await insertProduct(p)
        }

        closeForm();
        return resp

    }





    return mutationRegisterProduct

}

