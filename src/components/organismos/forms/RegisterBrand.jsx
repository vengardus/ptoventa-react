import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useBrandStore } from "../../../stores/brand.store";
import { useCompanyStore } from "../../../stores/company.store";
import { convertirCapitalize } from "../../../utils/conversiones";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { v } from "../../../styles/variables";
import { BtnSave } from "../../moleculas/BtnSave";
import { InputText } from "./ui/InputText";
import { Container } from './styles/registerBrand'
import { modalAlert } from "../../../utils/modalAlert";

const modelNameSingular = 'marca'

export function RegisterBrand({
    onClose,
    dataSelect,
    action,
    setIsExploding,
}) {
    const insertBrand = useBrandStore((state) => state.insert)
    const updateBrand = useBrandStore((state) => state.update)
    const currentCompany = useCompanyStore((state) => state.currentCompany)


    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const mutationRegisterBrand = useMutation({
        mutationKey: ["register_Brand"],
        mutationFn: async (data) => registerBrand(data),
        onError: (err) => console.log("Ocurrió un error", err.message),
    });

    const closeForm = () => {
        onClose();
        setIsExploding(true);
    };

    async function registerBrand(data) {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                description: convertirCapitalize(data.description),
                id_company: currentCompany.id,
                id: dataSelect.id,
            };
            const resp = await updateBrand(p);
            if ( resp.success )
                closeForm()
            else 
                modalAlert({ type: 'warning', text: `Error al actualizar ${modelNameSingular}: ${resp.message}` })
        } else {
            const p = {
                description: convertirCapitalize(data.description),
                id_company: currentCompany.id,
            };
            const resp = await insertBrand(p)
            if ( resp.success )
                closeForm()
            else 
                modalAlert({ type: 'warning', text: `Error al agregar ${modelNameSingular}: ${resp.message}` })
        }
    }

    useEffect(() => {
        // if (action === APP_CONFIG.actionCrud.update) {
            
        // }
    }, []);

    return (
        <Container>
            {mutationRegisterBrand.isPending? (
                <span className="text-xl">...🔼</span>
            ) : (
                <div className="sub-contenedor">
                    <div className="headers">
                        <section>
                            <h1>
                                {action == APP_CONFIG.actionCrud.update
                                    ? `Editar ${modelNameSingular}`
                                    : `Registrar nueva ${modelNameSingular}`}
                            </h1>
                        </section>

                        <section>
                            <span className="" onClick={onClose}>x</span>
                        </section>
                    </div>

                    <form className="formulario" onSubmit={handleSubmit(mutationRegisterBrand.mutate)}>
                        <section className="form-subcontainer">
                            <article>
                                <InputText icon={<v.iconoflechaderecha />}>
                                    <input
                                        className="form__field"
                                        defaultValue={dataSelect.description}
                                        type="text"
                                        placeholder="categoria"
                                        {...register("description", {
                                            required: true,
                                        })}
                                    />
                                    <label className="form__label">{modelNameSingular}</label>
                                    {errors.description?.type === "required" && (
                                        <p>Campo requerido</p>
                                    )}
                                </InputText>
                            </article>

                            <BtnSave
                                icon={<v.iconoguardar />}
                                title="Guardar"
                                bgcolor="#F9D70B"
                            />
                        </section>
                    </form>
                </div>
            )}
        </Container>
    );
}

