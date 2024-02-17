import { APP_CONFIG } from "../../../../utils/dataEstatica"


export const RegisterHeader = ({
    action,
    modelNameSingular,
    onClose
}) => {
    return (
        <div className="flex justify-between items-center mb-4 font-medium text-xl">
            <section className="font-medium text-xl"> 
                <h1>
                    {action == APP_CONFIG.actionCrud.update
                        ? `Editar ${modelNameSingular}`
                        : `Registrar nueva ${modelNameSingular}`}
                </h1>
            </section>

            <section>
                <span className="cursor-pointer" onClick={onClose}>x</span>
            </section>
        </div>
    )
}
