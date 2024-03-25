import { ButtonKeyboard } from "./ButtonKeyboard"

export const Footer = () => {
    return (
        <>
            <div className="flex w-6/12 md:4/127">
                <ButtonKeyboard
                    label="Eliminar"
                    className="px-7"
                />
                <ButtonKeyboard
                    label="Ver ventas del día y devoluciones"
                />
            </div>
        </>
    )
}
