import { cn } from "../../../../utils/tailwindMerge"

export const ButtonKeyboard = ({
    label = 'opction',
    bg = "bg-blue-500",
    color = "text-white",
    height = "h-[2rem]"
}) => {
    return (
        <div className={cn('buttonKeyboard', color, bg, height)}>
            {label}
        </div>
    )
}
