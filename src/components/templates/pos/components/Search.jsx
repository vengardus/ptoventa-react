import { InputTextSimple } from "../../../organismos/forms/ui/InputTextSimple";
import { ButtonKeyboard } from "./ButtonKeyboard";
import { FaBarcode } from "react-icons/fa6";

export default function Search() {
    return (
        <>
            <div className="w-full md:w-6/12">
                <InputTextSimple
                    name={'txtSearch'}
                />
            </div>
            <div className="flex gap-3">
                <ButtonKeyboard
                    label="Lectora"
                    height="h-[3rem]"
                    className="px-5"
                    Icon={FaBarcode}
                />
                <ButtonKeyboard
                    label="Teclado"
                    height="h-[3rem]"
                    className="px-5"
                />
            </div>
        </>
    )
}
