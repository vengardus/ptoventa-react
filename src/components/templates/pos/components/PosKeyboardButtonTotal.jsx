import { cn } from "../../../../utils/tailwindMerge"
import { ButtonKeyboard } from "./ButtonKeyboard"


export const PosKeyboardButtonTotal = ({
    bg="bg-[#38F566]",
    textColor="text-black"
}) => {
  return (
    <div className={cn('posKeyboardButtonTotal', bg, textColor)}>
        <div className="flex gap-3 px-3 md:hidden">
            <ButtonKeyboard label="Cobrar"/>
            <ButtonKeyboard label="..." />
        </div>
        <span className="font-bold text-2xl text-end px-2">
          $ 3.69
        </span>
    </div>
  )
}
