import { useForm } from "react-hook-form";
import { useBranchStore } from "../../../../../stores/branch.store";
import { BtnSave } from "../../../../moleculas/BtnSave";
import { InputNumber } from "../../ui/InputNumber";
import { InputSelect } from "../../ui/InputSelect";
import { useEffect } from "react";
import { RegisterHeader } from "../../base/RegisterHeader";
import { useRegisterProductStore } from "../../../../../stores/register.product.store";
import { getIndexArray } from "../../../../../utils/lib";
import { useState } from "react";

export const GetStockBranches = ({
    title,
    onClick,
    onClose,
    stocks
}) => {

    const dataBranch = useBranchStore(state => state.data)
    const itemSelectBranch = useBranchStore(state => state.itemSelect)
    const setBranchSelect = useRegisterProductStore(state => state.setBranchSelect)
    const branchSelect = useRegisterProductStore(state => state.branchSelect)
    const getStockBranches = useRegisterProductStore(state => state.getStockBranches)

    const [currentStockBranch, setCurrentStockBranch] = useState()

    const {
        register,
        formState: { errors },
        handleSubmit,
        setFocus,
        setValue
    } = useForm();

    const handleClick = (data) => {
        onClick({
            id: branchSelect?.id,
            id_branch: branchSelect?.id,
            branch_name: branchSelect?.name,
            stock: data.branch_stock,
            stock_min: data.branch_stock_min
        })
    }

    useEffect(() => {
        onSelect(itemSelectBranch)
    }, [])
    
    useEffect(() => {
        // Cuando cambia currentStockBranch
        setValue('branch_stock', currentStockBranch?.stock)
        setValue('branch_stock_min', currentStockBranch?.stock_min)
        
        setFocus("branch_stock")
    }, [currentStockBranch])


    const onSelect = (itemSelect) => {
        let currentStock = {
            stock: '',
            stock_min: 0
        }
        const index = getIndexArray(getStockBranches(), itemSelect.id)
        if (index != -1) {
            const item = getStockBranches()[index]
            currentStock = {
                stock: item.stock,
                stock_min: item.stock_min
            }
        }
        setCurrentStockBranch(currentStock)
        setBranchSelect(itemSelect)
    }

 
    return (
        <div className="containerRegisterForm">
            <div className="subContainerRegisterForm h-[85vh] overflow-y-auto">

                <RegisterHeader
                    title={title}
                    onClose={onClose}
                />

                <form
                    id="formStockBVranches"
                    className="1border-2 p-4 flex flex-col gap-4"
                    onSubmit={handleSubmit(handleClick)}>

                    <InputSelect
                        name={'branch'}
                        data={dataBranch}
                        label={'Sucursal'}
                        defaultItem={itemSelectBranch}
                        onSelect={onSelect}
                        isDescriptionName={false}

                    />

                    <InputNumber
                        name={'branch_stock'}
                        label={'Stock'}
                        register={register}
                        defaultValue={currentStockBranch?.stock}
                        registerProps={{
                            required: "Ingrese stock.",
                            min: {
                                value: 1,
                                message: 'Ingrese stock'
                            }
                        }}
                        autofocus={true}
                    >
                        {errors.branch_stock?.type === "required" && (
                            <p className="text-red-300">{errors.branch_stock.message}</p>
                        )}
                        {errors.branch_stock?.type === "min" && (
                            <p className="text-red-300">{errors.branch_stock.message}</p>
                        )}
                    </InputNumber>

                    <InputNumber
                        name={'branch_stock_min'}
                        label={'Stock Mínimo'}
                        register={register}
                        defaultValue={currentStockBranch?.stock_min}
                        registerProps={{
                            required: "Ingrese stock.",
                            min: {
                                value: 0,
                                message: 'Ingrese stock minimo'
                            }
                        }}
                    >
                        {errors.branch_stock?.type === "required" && (
                            <p className="text-red-300">{errors.branch_stock.message}</p>
                        )}
                        {errors.branch_stock_min?.type === "min" && (
                            <p className="text-red-300">{errors.branch_stock_min.message}</p>
                        )}
                    </InputNumber>

                    <BtnSave
                        title={'Agregar Stock'}
                        bgcolor="#F9D70B"
                    />


                </form>

                <table className="mt-4">
                    <thead>
                        <tr key={0} className="flex w-full">
                            <th className="w-4/12">Sucursal</th>
                            <th className="w-4/12 flex justify-center">Stock</th>
                            <th className="w-4/12 flex justify-center">Stock Min.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks?.map(item => (
                                <tr key={item.id_branch} className="flex">
                                    <th className="w-4/12">{item.branch_name}</th>
                                    <th className="w-4/12 flex justify-center">{parseFloat(item.stock)}</th>
                                    <th className="w-4/12 flex justify-center">{parseFloat(item.stock_min)}</th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}


