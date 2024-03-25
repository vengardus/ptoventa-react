import { cn } from "../../../../utils/tailwindMerge"

export const ButtonKeyboard = ({
    label = 'opction',
    bg = "bg-blue-500",
    color = "text-white",
    height = "h-[2rem]",
    className = "",
    Icon = null
}) => {
    return (
        <div className={cn('buttonKeyboard', color, bg, height, className)}>
            {Icon && <Icon />}
            {label.toUpperCase()}
        </div>
    )
}
