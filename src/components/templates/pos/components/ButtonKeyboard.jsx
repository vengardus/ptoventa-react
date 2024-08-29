import { cn } from "../../../../utils/tailwindMerge"

export const ButtonKeyboard = ({
    label = 'opction',
    bg = "bg-blue-500",
    color = "text-white",
    classIcon = "",
    height = "h-[2rem]",
    className = "",
    Icon = null,
    align="text-center",
    onClick=()=>{}
}) => {
    return (
        <div className={cn('buttonKeyboard', color, bg, height, align, className)}
            onClick={onClick}
        >
            {Icon && <Icon className={cn(classIcon)}/>}
            {label.toUpperCase()}
        </div>
    )
}
