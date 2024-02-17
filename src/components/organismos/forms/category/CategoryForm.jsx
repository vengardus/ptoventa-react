import { useForm } from "react-hook-form";
import { InputText2 } from "../ui/InputText2";
import { BtnSave } from "../../../moleculas/BtnSave";
import { v } from "../../../../styles/variables";
import { CirclePicker } from "react-color";


export const CategoryForm = ({
    dataSelect,
    mutationRegister,
    currentColor,
    handleOnChangeColor

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


                <article className="">
                    <div className="flex content-start items-center gap-[20px]">
                        {<v.paletacolores />}
                        <span>Color</span>
                    </div>
                    <div className="pt-[15px] min-h-[50px]">
                        <CirclePicker onChange={handleOnChangeColor} color={currentColor} />
                    </div>
                </article>

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
