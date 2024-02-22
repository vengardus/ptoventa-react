export const InputCheckBox = ({
    name,
    textSize = 'text-xl',
    textLabel = '?',
    checked = true
}) => {
    return (
        <div className={`flex items-center`}>
            <input
                id={name}
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={checked}
            />
            <label
                htmlFor="checked-checkbox"
                className={`ms-2 ${textSize} font-medium text-gray-900 dark:text-gray-300`}
            >{textLabel}</label>
        </div>
    )
}
