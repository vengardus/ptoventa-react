import { ButtonKeyboard } from "./ButtonKeyboard"

export const Footer = () => {
    return (
        <>
            <div className="flex w-6/12 md:4/127">
                <ButtonKeyboard
                    label="Eliminar"
                    className="px-7"
                    height="h-[3.5rem]"
                />
                <ButtonKeyboard
                    label="Ver ventas del día y devoluciones"
                    height="h-[3.5rem]"
                />
            </div>
        </>
    )
}
