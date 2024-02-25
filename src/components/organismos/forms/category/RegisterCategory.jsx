import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCategoryStore } from "../../../../stores/category.store";
import { useCompanyStore } from "../../../../stores/company.store";
import { convertirCapitalize } from "../../../../utils/conversiones";
import { APP_CONFIG } from "../../../../utils/dataEstatica";
import { modalAlert } from "../../../../utils/modalAlert";
import { RegisterHeader } from "../base/RegisterHeader";
import { v } from "../../../../styles/variables";
import { BtnSave } from "../../../moleculas/BtnSave";
import { CategoryForm } from "./CategoryForm";
import { Icon } from "../../../atomos/Icon";
import { PictureContainer } from "./PictureContainer";

const modelNameSingular = 'categoría'

export function     RegisterCategory({
    onClose,
    dataSelect,
    action,
    setIsExploding,
}) {
    const insertCategory = useCategoryStore((state) => state.insert)
    const updateCategory = useCategoryStore((state) => state.update)
    const currentCompany = useCompanyStore((state) => state.currentCompany)
    const [currentColor, setColor] = useState(APP_CONFIG.defaultValues.defaultColor);
    const [file, setFile] = useState([]);
    const ref = useRef(null);
    const [fileurl, setFileurl] = useState();

    const handleOnChangeColor = (color) => {
        setColor(color.hex)
    }

    
    const mutationRegisterCategory = useMutation({
        mutationKey: ["register_Category"],
        mutationFn: async (data) => registerCategory(data),
        onError: (err) => console.log("Ocurrió un error", err.message),
    });

    const closeForm = () => {
        onClose();
        setIsExploding(true);
    };

    async function registerCategory(data) {
        if (action === APP_CONFIG.actionCrud.update) {
            const p = {
                description: convertirCapitalize(data.description),
                id_company: currentCompany.id,
                color: currentColor,
                icon: dataSelect.icon,
                id: dataSelect.id,
            };
            const resp = await updateCategory(p, file);
            if ( resp.success ) closeForm()
            else modalAlert({ type: 'warning', text: `Error al actualizar ${modelNameSingular}: ${resp.message}` })
        } else {
            const p = {
                description: convertirCapitalize(data.description),
                color: currentColor,
                id_company: currentCompany.id,
            };
            const resp = await insertCategory(p, file)
            if ( resp.success ) closeForm()
            else modalAlert({ type: 'warning', text: `Error al agregar ${modelNameSingular}: ${resp.message}` })
        }
    }

    function openImages() {
        console.log('openImages')
        ref.current.click();
    }

    function prepareImage(e) {
        let filelocal = e.target.files;
        let fileReaderlocal = new FileReader();
        fileReaderlocal.readAsDataURL(filelocal[0]);
        const tipoimg = e.target.files[0];

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
        <div className="containerRegisterForm">
            {mutationRegisterCategory.isPending? (
                <span className="text-xl">...🔼</span>
            ) : (
                <div className="subContainerRegisterForm">
                    <RegisterHeader
                        title={action == APP_CONFIG.actionCrud.update
                            ? `Editar ${modelNameSingular}:`
                            : `Agregar ${convertirCapitalize(modelNameSingular)}:`}
                        onClose={onClose}
                    />

                    <PictureContainer>
                        {fileurl != null ? (
                            <div className="overflow">
                                <img className="w-full object-containt" src={fileurl}></img>
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
                            className="hidden"
                        ></input>
                    </PictureContainer>

                    <CategoryForm 
                        dataSelect={dataSelect}
                        mutationRegister={mutationRegisterCategory}
                        currentColor={currentColor}
                        handleOnChangeColor={(value) => handleOnChangeColor(value)}
                    />

                </div>
            )}
        </div>
    );
}

