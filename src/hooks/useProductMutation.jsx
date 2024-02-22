import { useMutation } from "@tanstack/react-query";
import { useRegisterProductStore } from "../stores/register.product.store";


export const useProductMutation = () => {
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
        console.log('save', data, getIsWarehouse(), getIsMultiPrices(), getUnitSaleSelect(), getCategorySelect())
    }
    return mutationRegisterProduct

}

