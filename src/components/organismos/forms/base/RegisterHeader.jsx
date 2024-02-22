import { convertirCapitalize } from "../../../../utils/conversiones"
import { APP_CONFIG } from "../../../../utils/dataEstatica"


export const RegisterHeader = ({
    action,
    modelNameSingular,
    onClose
}) => {
    return (
        <div className="flex justify-between items-center mb-7 font-semibold text-xl">
            <section className="font-medium text-xl"> 
                <h1>
                    {action == APP_CONFIG.actionCrud.update
                        ? `Editar ${modelNameSingular}:`
                        : `Agregar ${convertirCapitalize(modelNameSingular)}:`}
                </h1>
            </section>

            <section>
                <span className="cursor-pointer text-[1.7rem]" onClick={onClose}>x</span>
            </section>
        </div>
    )
}
