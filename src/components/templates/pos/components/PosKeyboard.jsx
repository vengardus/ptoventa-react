import { ButtonKeyboard } from "./ButtonKeyboard"
import { PosKeyboardButtonTotal } from "./PosKeyboardButtonTotal"

export const PosKeyboard = () => {
    return (
        <div className="w-full p-2 flex flex-col justify-between border-2" >

            <section id="buttons" className="flex flex-col gap-3">
                <div className="flex justify-around gap-3 px-3">
                    <ButtonKeyboard />
                    <ButtonKeyboard />
                </div>
                <div className="flex justify-around gap-3 px-3">
                    <ButtonKeyboard />
                    <ButtonKeyboard />
                </div>
            </section>

            <section id="totals" className="flex flex-col items-end">
                <div>Subtotal: <span>S/ 3.69</span></div>
                <div>Igv <span>(18%)</span>: <span>S/ 3.69</span></div>
                <div>Total: <span>S/ 3.69</span></div>

                <PosKeyboardButtonTotal
                    color="#f25354"
                />
            </section>

        </div>
    )
}
