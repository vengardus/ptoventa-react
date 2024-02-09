import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useCategoryStore } from "../../../store/category.store";
import { useCompanyStore } from "../../../store/company.store";
import { convertirCapitalize } from "../../../utils/conversiones";
import { APP_CONFIG } from "../../../utils/dataEstatica";
import { v } from "../../../styles/variables";
import { Icon } from "../../atomos/Icon";
import { BtnSave } from "../../moleculas/BtnSave";
import { InputText } from "./InputText";
import { CirclePicker } from "react-color";
import { Container, ContentTitle, PictureContainer } from './styles/register_category'

export function RegisterCategory({
    onClose,
    dataSelect,
    action,
    setIsExploding,
}) {
    const insertCategory = useCategoryStore((state) => state.insert)
    const updateCategory = useCategoryStore((state) => state.update)
    const currentCompany = useCompanyStore((state) => state.currentCompany)
    const [currentColor, setColor] = useState("#F44336");
    const [file, setFile] = useState([]);
    const ref = useRef(null);
    const [fileurl, setFileurl] = useState();

    const handleOnChangeColor = (color) => {
        setColor(color.hex)
    }

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const mutationRegisterCategory = useMutation({
        mutationKey: ["register_Category"],
        mutationFn: async (data) => registerCategory(data),
        onError: (err) => console.log("Ocurrió un error", err.message),
        onSuccess: () => closeForm(),
    });

    // const handleSub = (data) => {
    //     console.log('handle', data)
    //     mutate(data);
    // };

    const closeForm = () => {
        onClose();
        //setIsExploding(true);
    };

    async function registerCategory(data) {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                description: convertirCapitalize(data.description),
                id_company: currentCompany.id,
                color: currentColor,
                id: dataSelect.id,
            };
            await updateCategory(p, dataSelect.icon, file);
        } else {
            const p = {
                description: convertirCapitalize(data.description),
                color: currentColor,
                //_icon: "-",
                id_company: currentCompany.id,
            };
            console.log('inseert', p, file)
            await insertCategory(p, file);
        }
    }
    function openImages() {
        console.log('openImages')
        ref.current.click();
    }

    function prepareImage(e) {
        console.log('preparIemage', e)
        let filelocal = e.target.files;
        let fileReaderlocal = new FileReader();
        fileReaderlocal.readAsDataURL(filelocal[0]);
        const tipoimg = e.target.files[0];

        console.log('typeImg', tipoimg)

        setFile(tipoimg);
        if (fileReaderlocal && filelocal && filelocal.length) {
            fileReaderlocal.onload = function load() {
                setFileurl(fileReaderlocal.result);
            };
        }
    }

    useEffect(() => {
        if (action === APP_CONFIG.actionCrud.update) {
            setColor(dataSelect.color);
            setFileurl(dataSelect.icon);
        }
    }, [action, dataSelect.color, dataSelect.icon]);

    return (
        <Container>
            {mutationRegisterCategory.isPending? (
                <span>...🔼</span>
            ) : (
                <div className="sub-contenedor">
                    <div className="headers">
                        <section>
                            <h1>
                                {action == APP_CONFIG.actionCrud.update
                                    ? "Editar categoría"
                                    : "Registrar nueva categoría"}
                            </h1>
                        </section>

                        <section>
                            <span onClick={onClose}>x</span>
                        </section>
                    </div>
                    <PictureContainer>
                        {fileurl != "-" ? (
                            <div className="ContentImage">
                                <img src={fileurl}></img>
                            </div>
                        ) : (
                            <Icon>{<v.iconoimagenvacia />}</Icon>
                        )}

                        <BtnSave
                            func={openImages}
                            title="+imagen(opcional)"
                            textColor="#5f5f5f"
                            bgcolor="rgb(183, 183, 182)"
                            icon={<v.iconosupabase />}
                        />
                        <input
                            type="file"
                            ref={ref}
                            onChange={(e) => prepareImage(e)}
                        ></input>
                    </PictureContainer>

                    <form className="formulario" onSubmit={handleSubmit(mutationRegisterCategory.mutate)}>
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
                                    <label className="form__label">categoria</label>
                                    {errors.description?.type === "required" && (
                                        <p>Campo requerido</p>
                                    )}
                                </InputText>
                            </article>

                            <article className="colorContainer">
                                <ContentTitle>
                                    {<v.paletacolores />}
                                    <span>Color</span>
                                </ContentTitle>
                                <div className="colorPickerContent">
                                    <CirclePicker onChange={handleOnChangeColor} color={currentColor} />
                                </div>
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

