import { useMutation } from "@tanstack/react-query";
import { useBrandStore } from "../../../../stores/brand.store";
import { useCompanyStore } from "../../../../stores/company.store";
import { APP_CONFIG } from "../../../../utils/dataEstatica";
import { convertirCapitalize } from "../../../../utils/conversiones";
import { modalAlert } from "../../../../utils/modalAlert";
import { RegisterHeader } from "../base/RegisterHeader";
import { BrandForm } from "./BrandForm";


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
            if ( resp.success ) closeForm()
            else modalAlert({ type: 'warning', text: `Error al actualizar ${modelNameSingular}: ${resp.message}` })
        } else {
            const p = {
                description: convertirCapitalize(data.description),
                id_company: currentCompany.id,
            };
            const resp = await insertBrand(p)
            if ( resp.success )closeForm()
            else modalAlert({ type: 'warning', text: `Error al agregar ${modelNameSingular}: ${resp.message}` })
        }
    }


    return (
        <div className="containerRegisterForm">
            {mutationRegisterBrand.isPending? (
                <span className="text-xl">...🔼</span>
            ) : (
                <div className="subContainerRegisterForm">
                    <RegisterHeader 
                        action={action}
                        modelNameSingular={modelNameSingular}
                        onClose={onClose}
                    />

                    <BrandForm 
                        dataSelect={dataSelect}
                        mutationRegister={mutationRegisterBrand}
                    />
                </div>
            )}
        </div>
    );
}

