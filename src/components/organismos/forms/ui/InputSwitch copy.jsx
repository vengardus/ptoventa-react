
export const InputSwitch = ({
    name,
    textLabel = '',
    textSize = 'text-md',
    defaultValue,
    functionSelect,
}) => {
    const handleOnChange = () => {
        var select = document.getElementById(name);
        var value = select.checked;
        functionSelect(value)
    }

    return (
        <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
                id={name}
                name={name}
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={defaultValue}
                onChange={handleOnChange}
            />
            <span
                className={`"ms-0 pr-4 ${textSize} font-medium text-gray-900 dark:text-gray-300`}
            >{textLabel}:</span>
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}
