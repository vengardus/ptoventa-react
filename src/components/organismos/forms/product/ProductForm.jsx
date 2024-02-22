import { useForm } from "react-hook-form"
import { v } from "../../../../styles/variables"
import { BtnSave } from "../../../moleculas/BtnSave"
import { InputText2 } from "../ui/InputText2"
import { InputNumber } from "../ui/InputNumber"
import { useCategoryStore } from "../../../../stores/category.store"
import { InputSelect } from "../ui/InputSelect"
import { SaleUnitsData } from "../../../../utils/dataEstatica"
//import { useState } from "react"
import { useEffect } from "react"
import { InputSwitch } from "../ui/InputSwitch"
import { useRegisterProductStore } from "../../../../stores/register.product.store"
import { useState } from "react"


export const ProductForm = ({
    dataSelect,
    mutationRegister,
    addCategory,
    action
}) => {
    //const categorySelect = useCategoryStore((state) => state.itemSelect)
    const dataCategory = useCategoryStore((state) => state.data)
    //const selectCategory = useCategoryStore((state) => state.selectCategory)
    //const [unitSaleSelect, setUnitSaleSelect] = useState(SaleUnitsData[0])

    const getCategorySelect = useRegisterProductStore(state => state.getCategorySelect)
    const setCategorySelect = useRegisterProductStore(state => state.setCategorySelect)

    const getUnitSaleSelect = useRegisterProductStore(state => state.getUnitSaleSelect)
    const setUnitSaleSelect = useRegisterProductStore(state => state.setUnitSaleSelect)

    const getIsWarehouse = useRegisterProductStore(state => state.getIsWarehouse)
    const setIsWarehouse = useRegisterProductStore(state => state.setIsWarehouse)
    const getIsMultiPrices = useRegisterProductStore(state => state.getIsMultiPrices)
    const setIsMultiPrices = useRegisterProductStore(state => state.setIsMultiPrices)


    //const [unitSale, setUnitSale] = useState({})
    const [refresh, setRefresh] = useState(false)

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    // useEffect(() => {
    //     if (action != APP_CONFIG.actionCrud.update) {
    //         setCategorySelect(categorySelect)
    //     }
    //     else {
    //         let index = getIndexData(SaleUnitsData, dataSelect.unit_sale)
    //         if (index == -1) console.error('Ocurrió un error: No se encontró product.unit_sale')
    //         else setUnitSaleSelect(SaleUnitsData[index])

    //         index = getIndexData(dataCategory, dataSelect.id_category)
    //         if (index == -1) console.error('Ocurrió un error: No se encontró product.id_category')
    //         else {
    //             //selectCategory(dataCategory[index])
    //             setCategorySelect(dataCategory[index])
    //         }

    //         setIsWarehouse(dataSelect.is_warehouse)
    //         setIsMultiPrices(dataSelect.is_multi_prices)

    //     }

    // }, [
    //     action, dataSelect, 
    //     categorySelect, dataCategory, 
    //     setUnitSaleSelect, 
    //     setIsWarehouse, setIsMultiPrices,
    //     setCategorySelect
    // ])

    useEffect(() => {
        //if ( action == APP_CONFIG.actionCrud.update ) {
            // let index = getIndexData(SaleUnitsData, dataSelect.unit_sale)
            // console.log('effect-register', dataSelect.unit_sale, getUnitSaleSelect())
            // if (index == -1) console.error('Ocurrió un error: No se encontró product.unit_sale')
            // else {
            //     console.log('Load', SaleUnitsData[index])
            //     setUnitSaleSelect(SaleUnitsData[index])
            // }
            //setUnitSale(SaleUnitsData[index])
            
            //setUnitSale(getUnitSaleSelect())
            setRefresh(true)

            
            //getUnitSaleSelect()
        // }
        //  else
        //      setUnitSale(SaleUnitsData[0])
        //console.log('uuu', unitSale, SaleUnitsData[0])
        //refresh
    }, [refresh])
    console.log(action)

    return (
        <form className="form flex flex-col w-full overflow-y-auto max-h-[85vh]" onSubmit={handleSubmit(mutationRegister.mutate)}>
            {/* <div className="formSection"> */}
            <div className="flex flex-col md:flex-row w-full md:gap-x-4">
                <section className="md:w-1/2">
                    <InputText2
                        name={'name'}
                        label={'Descripción'}
                        register={register}
                        defaultValue={dataSelect.name}
                        registerProps={{}}
                        required
                    >
                        {errors.description?.type === "required" && (
                            <p className="text-red-300">{errors.description.message}</p>
                        )}
                    </InputText2>

                    <InputNumber
                        name={'price_sale'}
                        label={'P.Venta'}
                        register={register}
                        defaultValue={dataSelect.price_sale}
                        registerProps={{}}
                        required
                    >
                    </InputNumber>

                    <InputNumber
                        name={'price_buy'}
                        label={'P.Compra'}
                        register={register}
                        defaultValue={dataSelect.price_buy}
                        registerProps={{}}
                        required
                    >
                    </InputNumber>

                    <InputText2
                        name={'barcode'}
                        label={'Código Barras'}
                        register={register}
                        defaultValue={dataSelect.barcode}
                        registerProps={{}}
                    >
                    </InputText2>

                    <InputText2
                        name={'cod'}
                        label={'Código Interno'}
                        register={register}
                        defaultValue={dataSelect.cod}
                        registerProps={{}}
                    >
                    </InputText2>

                    <InputNumber
                        name={'stock_min'}
                        label={'Stock Mínimo'}
                        register={register}
                        defaultValue={dataSelect.stock_min}
                        registerProps={{}}
                        required
                    >
                    </InputNumber>
                </section>

                <section className="md:w-1/2 mt-0 flex flex-col gap-4">
                    <div className="flex w-full">
                        <div className="flex w-10/12 bg-yellow">
                            <InputSelect
                                name={'category'}
                                data={dataCategory}
                                label={'Categoría'}
                                defaultItem={getCategorySelect()}
                                onSelect={setCategorySelect}
                            />
                        </div>
                        <div className="flex items-start justify-end w-2/12">
                            <div className="rounded-full w-[2.30rem] h-[2.30rem] border- text-[1.2rem] flex justify-center items-center text-black bg-white"
                                onClick={addCategory}>
                                +
                            </div>
                        </div>
                    </div>

                    <div className="w-10/12">
                        {
                            getUnitSaleSelect() &&
                            <InputSelect
                                name={'unit_sale'}
                                data={SaleUnitsData}
                                label={'Und.Venta'}
                                defaultItem={getUnitSaleSelect()}
                                onSelect={setUnitSaleSelect}
                            />
                        }

                    </div>

                    <InputSwitch
                        name={'is_warehouse'}
                        defaultValue={getIsWarehouse()}
                        label="Controlar Stock"
                        onSelect={setIsWarehouse}
                    />

                    <InputSwitch
                        name={'is_multi_prices'}
                        defaultValue={getIsMultiPrices()}
                        label="Multi empresa"
                        onSelect={setIsMultiPrices}
                    /> 

                </section>
            </div>

            <div className="w-full flex justify-center mt-8">
                <BtnSave
                    icon={<v.iconoguardar />}
                    title="Guardar"
                    bgcolor="#F9D70B"
                />
            </div>
        </form>
    )
}
