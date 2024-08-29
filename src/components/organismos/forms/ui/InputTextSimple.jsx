export const InputTextSimple = ({
    children,
    name,
    label,
    defaultValue,
    _onChange=null,
    _ref = null,
    ...props
}) => {

    const onChange = (e) => {
        if (_onChange) _onChange(e.target.value)
    }

    return (
        <div className="">
            <input
                type="text"
                id={name}
                name={name}
                defaultValue={defaultValue}
                ref={_ref}
                onChange={onChange}
                className="block py-3.5 px-[2rem] w-full text-md text-gray-900 bg-transparent border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...props}
            />
            <label htmlFor={name} className="" >
                {label}
            </label>
            {children}
        </div>
    )
}
