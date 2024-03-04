import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useProductStore } from "../../../../stores/product.store";
// import { useCompanyStore } from "../../../../stores/company.store";
import { APP_CONFIG, SaleUnitsData } from "../../../../utils/dataEstatica";
// import { convertirCapitalize } from "../../../../utils/conversiones";
// import { modalAlert } from "../../../../utils/modalAlert";
import { RegisterHeader } from "../base/RegisterHeader";
import { ProductForm } from "./ProductForm";
import { RegisterCategory } from "../category/RegisterCategory";
import { useEffect } from "react";
import { useRegisterProductStore } from "../../../../stores/register.product.store";
import { useProductMutation } from "../../../../hooks/useProductMutation";
import { useCategoryStore } from "../../../../stores/category.store";
import { getIndexArray } from "../../../../utils/lib";
import { useCallback } from "react";
import { convertirCapitalize } from "../../../../utils/conversiones";
import { useBranchStore } from "../../../../stores/branch.store";
import { useCompanyStore } from "../../../../stores/company.store";
import { modalAlert } from "../../../../utils/modalAlert";
import { useQuery } from "@tanstack/react-query";


const modelNameSingular = 'producto'

export function ProductRegister({
    onClose,
    dataSelect,
    action,
    setIsExploding,
}) {
    //const [isWarehouse, setIsWarehouse] = useState(false)

    // const insertProduct = useProductStore((state) => state.insert)
    // const updateProduct = useProductStore((state) => state.update)
    // const currentCompany = useCompanyStore((state) => state.currentCompany)

    const [openRegisterCategory, setOpenRegisterCategory] = useState(false)
    const [subAction, setSubAction] = useState('')

    const categorySelect = useCategoryStore((state) => state.itemSelect)
    const dataCategory = useCategoryStore((state) => state.data)

    // const getCategorySelect = useRegisterProductStore(state => state.getCategorySelect)
    const setCategorySelect = useRegisterProductStore(state => state.setCategorySelect)

    //const getUnitSaleSelect = useRegisterProductStore(state => state.getUnitSaleSelect)
    const setUnitSaleSelect = useRegisterProductStore(state => state.setUnitSaleSelect)

    // const getIsWarehouse = useRegisterProductStore(state => state.getIsWarehouse)
    const setIsWarehouse = useRegisterProductStore(state => state.setIsWarehouse)
    // const getIsMultiPrices = useRegisterProductStore(state => state.getIsMultiPrices)
    const setIsMultiPrices = useRegisterProductStore(state => state.setIsMultiPrices)

    const deleteStockBranches = useRegisterProductStore(state => state.deleteStockBranches)

    const currentCompany = useCompanyStore((state) => state.currentCompany)

    const [idProduct, setIdProduct] = useState(null)
    const getByCompanyProduct_Warehouse = useRegisterProductStore(state => state.getByCompanyProduct_Warehouse)

    const queryWarehouse = useQuery({
        queryKey: ['getByCompanyProduct_Branch', currentCompany.id, idProduct],
        queryFn: () => getByCompanyProduct_Warehouse(currentCompany.id, idProduct),
        enabled: (idProduct!=null  && currentCompany.id!=null),
    })

    useEffect(()=>{
        if ( queryWarehouse.isSuccess)
            console.log('load stocks!!!!')
    }, [queryWarehouse.isSuccess])
    

    const handleOnClose = () => {
        deleteStockBranches()
        onClose()
    }
    const closeFormOk = (success, message) => {
        if (!success) {
            modalAlert({ type: 'warning', text: `Error al agregar ${modelNameSingular}: ${message}` })
            return
        }
        handleOnClose()
        setIsExploding(true)
    };
    //const isWarehouse = useRegisterProductStore((state)=>state.isWarehouse)
    const mutationRegisterProduct = useProductMutation({
        action,
        dataSelect,
        closeForm: closeFormOk,
        id_company: currentCompany?.id,
    })

    // const mutationRegisterProduct = useMutation({
    //     mutationKey: ["register_Product"],
    //     mutationFn: async (data) => registerProduct1(data),
    //     onError: (err) => console.log("Ocurrió un error", err.message),
    // });


    const addCategory = () => {
        setOpenRegisterCategory(!openRegisterCategory)
        setSubAction(APP_CONFIG.actionCrud.insert)
    }

    // async function registerProduct1(data) {
    //     if (action === APP_CONFIG.actionCrud.update) {
    //         const p = {
    //             description: convertirCapitalize(data.description),
    //             id_company: currentCompany.id,
    //             id: dataSelect.id,
    //         };
    //         const resp = await updateProduct(p);
    //         if (resp.success) closeForm()
    //         else modalAlert({ type: 'warning', text: `Error al actualizar ${modelNameSingular}: ${resp.message}` })
    //     } else {
    //         const p = {
    //             description: convertirCapitalize(data.description),
    //             id_company: currentCompany.id,
    //         };
    //         const resp = await insertProduct(p)
    //         if (resp.success) closeForm()
    //         else modalAlert({ type: 'warning', text: `Error al agregar ${modelNameSingular}: ${resp.message}` })
    //     }
    // }



    const initData = useCallback(() => {
        setCategorySelect(categorySelect)
        setUnitSaleSelect(SaleUnitsData[0])
        setIsMultiPrices(false)
        setIsWarehouse(false)
        console.log('init!!!')
    }, [
        categorySelect, setCategorySelect,
        setIsMultiPrices, setUnitSaleSelect, setIsWarehouse
    ])

    const loadData = useCallback(() => {
        let index = getIndexArray(SaleUnitsData, dataSelect.unit_sale)
        if (index == -1) console.error('Ocurrió un error: No se encontró product.unit_sale')
        else setUnitSaleSelect(SaleUnitsData[index])

        index = getIndexArray(dataCategory, dataSelect.id_category)
        if (index == -1) console.error('Ocurrió un error: No se encontró product.id_category')
        else setCategorySelect(dataCategory[index])

        setIsWarehouse(dataSelect.is_warehouse)
        setIsMultiPrices(dataSelect.is_multi_prices)

        setIdProduct(dataSelect.id)
        queryWarehouse.refetch()
    }, [
        dataCategory, dataSelect, setCategorySelect,
        setIsMultiPrices, setIsWarehouse, setUnitSaleSelect
    ])

    useEffect(() => {
        if (action != APP_CONFIG.actionCrud.update)
            initData()
        else
            loadData()
    }, [action, loadData, initData])

    return (
        <div className="containerRegisterForm">
            {mutationRegisterProduct.isPending ? (
                <span className="text-xl">...🔼</span>
            ) : (
                <div className="subContainerRegisterForm">
                    <RegisterHeader
                        title={action == APP_CONFIG.actionCrud.update
                            ? `Editar ${modelNameSingular}:`
                            : `Agregar ${convertirCapitalize(modelNameSingular)}:`}
                        onClose={handleOnClose}
                    />

                    <ProductForm
                        dataSelect={dataSelect}
                        mutationRegister={mutationRegisterProduct}
                        addCategory={addCategory}
                        action={action}
                    />

                    {/* registerCategory */}
                    {
                        openRegisterCategory
                        && <RegisterCategory
                            dataSelect={[]}
                            onClose={() => setOpenRegisterCategory(!openRegisterCategory)}
                            action={subAction}
                            setIsExploding={setIsExploding}
                        />
                    }
                </div>
            )}
        </div>
    );
}

