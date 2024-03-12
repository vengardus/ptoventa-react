import { ButtonKeyboard } from "./ButtonKeyboard"


export const PosKeyboardButtonTotal = ({
    classBg="bg-[#38F566]",
    classColor="text-black"
}) => {
  return (
    <div className={`flex flex-col border-2 w-full py-2 ${classBg} ${classColor}`}>
        <div className="flex gap-3 px-3">
            <ButtonKeyboard label="Cobrar"/>
            <ButtonKeyboard label="..." />
        </div>
        <span className="font-bold text-xl text-end">$ 3.69</span>
    </div>
  )
}
