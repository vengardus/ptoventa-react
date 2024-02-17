import { useForm } from "react-hook-form"
import { v } from "../../../../styles/variables"
import { BtnSave } from "../../../moleculas/BtnSave"
import { InputText2 } from "../ui/InputText2"


export const BrandForm = ({
    dataSelect,
    mutationRegister
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();


    return (
        <form className="form" onSubmit={handleSubmit(mutationRegister.mutate)}>
            <div className="formSection">
                <InputText2
                    name={'description'}
                    txtLabel={'Descripción'}
                    register={register}
                    defaultValue={dataSelect.description}
                    registerProps={{}}
                    required
                >
                    {errors.description?.type === "required" && (
                        <p className="text-red-300">{errors.description.message}</p>
                    )}
                </InputText2>

            </div>

            <div className="w-full flex justify-center">
                <BtnSave
                    icon={<v.iconoguardar />}
                    title="Guardar"
                    bgcolor="#F9D70B"
                />
            </div>
        </form>
    )
}
