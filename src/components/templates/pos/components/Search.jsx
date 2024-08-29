import { useState } from "react";
import { useRef } from "react";
import { InputTextSimple } from "../../../organismos/forms/ui/InputTextSimple";
import { ButtonKeyboard } from "./ButtonKeyboard";
import { FaBarcode } from "react-icons/fa6";
import { FaKeyboard } from "react-icons/fa";
import { useThemeStore } from "../../../../stores/theme.store";
import { ListGeneric } from "../../../organismos/ListGeneric";
import { useProductStore } from "../../../../stores/product.store";

const TypeSearch = {
    barcode: 0,
    keynoard: 1
}

export default function Search({
    products = []
}) {
    const [typeSearch, setTypeSearch] = useState(TypeSearch.barcode)
    const [openList, setOpenList] = useState(false)
    const txtSearchRef = useRef(null)
    const themeStyle = useThemeStore((state) => state.themeStyle)
    const setStrSearch = useProductStore((state) => state.setStrSearch)


    const setFocus = () => {
        txtSearchRef.current.focus()
    }

    const onChangeTxtSearch = (txtSearch) => {
        setStrSearch(txtSearch)
        txtSearchRef.current.value = txtSearch
    }

    const activateBarcode = () => {
        txtSearchRef.current.value = ""
        setTypeSearch(TypeSearch.barcode)
        setOpenList(false)
        setFocus()
    }
    
    const activateKeyboard = () => {
        txtSearchRef.current.value = ""
        setTypeSearch(TypeSearch.keynoard)
        setOpenList(true)
        setFocus()
    }


    return (
        <>
            <div className="w-full md:w-6/12 relative">
                <InputTextSimple
                    name={'txtSearch'}
                    _ref={txtSearchRef}
                    _onChange={
                        typeSearch == TypeSearch.barcode? null :
                        (txtSearch) => { onChangeTxtSearch(txtSearch) }
                    }
                />
                {
                    openList &&
                    <ListGeneric
                        data={products}
                        scroll={"scroll"}
                        func={(item) => {
                            console.log(item)
                        }}
                        setState={() => setOpenList(!openList)}
                    />
                }
            </div>

            <div className="flex gap-3">
                <ButtonKeyboard
                    label="Lectora"
                    height="h-[3rem]"
                    className="px-5"
                    Icon={FaBarcode}
                    classIcon="text-black text-[1.25rem]"
                    bg={typeSearch == TypeSearch.barcode ? themeStyle.bgSelected : themeStyle.bgDeselected}
                    color={typeSearch == TypeSearch.barcode ? themeStyle.colorSelected : themeStyle.colorDeselected}
                    onClick={activateBarcode}
                />
                <ButtonKeyboard
                    label="Teclado"
                    height="h-[3rem]"
                    className="px-5"
                    Icon={FaKeyboard}
                    classIcon="text-blue-800 text-[1.25rem]"
                    bg={typeSearch == TypeSearch.keynoard ? themeStyle.bgSelected : themeStyle.bgDeselected}
                    color={typeSearch == TypeSearch.keynoard ? themeStyle.colorSelected : themeStyle.colorDeselected}
                    onClick={activateKeyboard}
                />
            </div>

        </>
    )
}
