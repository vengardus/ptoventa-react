import { useEffect } from "react";
import { useState } from "react";
import { v } from "../../../../styles/variables";

/*
    si isDescriptionName es true => el nombre de la columna de la data será: descrition
    sino será: name
*/

export const InputSelect = ({
    data,
    name,
    label,
    defaultItem,
    onSelect,
    isDescriptionName = true
}
) => {
    const [showSelect, setShowSelect] = useState(false)
    const [itemSelect, setItemSelect] = useState(null)

    const handleOnChange = () => {
        var select = document.getElementById(name);
        var value = select.options[select.selectedIndex].value;
        const index = data.findIndex((item) => (typeof (item.id) == 'number')
            ? item.id === parseInt(value)
            : item.id === value
        )
        if (index == -1) console.log('index-ERROR', data, value)
        else {
            onSelect(data[index])
            setItemSelect(data[index])
        }
        setShowSelect(!showSelect)
    }

    useEffect(() => {
        setItemSelect(defaultItem)
    }, [defaultItem])


    return (
        <div className={` flex flex-col gap-y-1 w-full`}>
            <label htmlFor={name}
                className="flex mb-0 text-sm font-medium text-gray-900 dark:text-white gap-x-4 items-center"
                onClick={() => setShowSelect(!showSelect)}
            >
                <span className="">{label}:</span>
                <span className="border border-blue-500 py-2 px-4 w-full flex justify-between hover:cursor-pointer">
                    <span>
                        {
                            !itemSelect? ''
                            : isDescriptionName ? itemSelect?.description : itemSelect.name
                        }
                    </span>
                    <span className="">
                        {<v.iconoFlechabajo />}
                    </span>
                </span>
            </label>
            {
                showSelect &&
                <select
                    onChange={handleOnChange} id={name}
                    defaultValue={itemSelect.id}
                    className="pt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                    {/* <option selected disabled className="">Seleccione categoría</option> */}
                    {
                        data.map(item => <option key={item.id} value={item.id} >
                            {
                                isDescriptionName ? item.description : item.name
                            }
                        </option>)
                    }
                </select>
            }
        </div>
    )
}
