import { ButtonKeyboard } from "./ButtonKeyboard"
import { PosKeyboardButtonTotal } from "./PosKeyboardButtonTotal"

export const PosKeyboard = () => {
    return (
        <div className="w-full p-2 flex flex-col justify-between border-2" >
            
            {/* TECLADO */}
            <section id="buttons" className="flex flex-col gap-3">
                <div className="flex justify-around gap-3 px-3">
                    <ButtonKeyboard
                        label="Efectivo"
                    />
                    <ButtonKeyboard
                        label="Crédtio"
                    />
                </div>
                <div className="flex justify-around gap-3 px-3">
                    <ButtonKeyboard
                        label="Tarjeta"
                    />
                    <ButtonKeyboard
                        label="Mixto"
                    />
                </div>
            </section>

            {/* TOTALES */}
            <section id="totals" className="flex flex-col items-end gap-2">
                <div className="w-full">
                    <div className="flex">
                        <div className="w-1/2 text-right">Subtotal</div>
                        <div className="w-1/2 text-right">S/ 3.69</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-right">Igv (18%)</div>
                        <div className="w-1/2 text-right">S/ 3.69</div>
                    </div>
                    <div className="flex">
                        <div className="w-1/2 text-right">Total</div>
                        <div className="w-1/2 text-right">S/ 3.69</div>
                    </div>
                </div>

                <PosKeyboardButtonTotal
                    color="#f25354"
                />
            </section>

        </div>
    )
}
