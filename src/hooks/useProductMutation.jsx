import { useMutation } from "@tanstack/react-query";
import { useRegisterProductStore } from "../stores/register.product.store";
import { APP_CONFIG } from "../utils/dataEstatica";
import { convertirCapitalize } from "../utils/conversiones";


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


    const getIsWarehouse = useRegisterProductStore(state => state.getIsWarehouse)
    const getIsMultiPrices = useRegisterProductStore(state => state.getIsMultiPrices)
    const getUnitSaleSelect = useRegisterProductStore(state => state.getUnitSaleSelect)
    const getCategorySelect = useRegisterProductStore(state => state.getCategorySelect)


    async function registerProduct(data) {
        console.log('save', action, data, getIsWarehouse(), getIsMultiPrices(), getUnitSaleSelect(), getCategorySelect(), dataSelect)
        if (action == APP_CONFIG.actionCrud.update)
            actionUpdate(data, dataSelect)
        else
            actionInsert(data, closeForm)
    }

    async function actionUpdate(data, dataSelect) {
        const p = {
            p_name: convertirCapitalize(data.name),
            p_price_sale: parseFloat(data.price_sale),
            p_price_buy: parseFloat(data.price_buy),
            p_id_category: getCategorySelect().id,
            p_barcode: data.barcode,
            p_cod: data.cod,
            p_unit_sale: getUnitSaleSelect().id,
            p_stock_min: parseFloat(data.stock_min),
            p_is_warehouse: getIsWarehouse(),
            p_is_multi_prices: getIsMultiPrices(),
        };
        console.log('UPDATE', p)

        console.log('==', !getIsWarehouse(), dataSelect.is_warehouse)

        if (!getIsWarehouse() && dataSelect.is_warehouse)
            console.log('DELETE STOCKS')
        else if ( getIsWarehouse() )
            console.log('DELETE AND SAVE STOCKS')

            // const error = await updateProduct(p)
            // if (error)
            //     modalAlert({
            //         type: 'warning',
            //         text: `No se actualizó el producto (${error})`
            //     })
            closeForm();
    }

    async function actionInsert(data, closeForm) {
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

        

        console.log('INSERT', p)
        //await insertProduct(p)
        closeForm();
    }


    return mutationRegisterProduct

}

