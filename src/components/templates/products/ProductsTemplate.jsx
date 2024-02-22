import ConfettiExplosion from "react-confetti-explosion";
import { useProductStore } from "../../../stores/product.store"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { Search } from "./components/Search"
import { Table } from "./components/Table"
import { ProductRegister } from "../../organismos/forms/product/ProductRegister";


const title = "Productos"

export const ProductsTemplate = () => {
    const products = useProductStore((state) => state.data)
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister,
        isExploding, setIsExploding
    } = useActionRegister(products)

 
    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                actionRegister={({ action, data }) => actionRegister({ action, data })}
            />

            <Search />

            <section id="sectionTable" className="sectionTableTemplate">
                {isExploding && <ConfettiExplosion />}
                <Table
                    data={products ?? []}
                    actionRegister={actionRegister}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <ProductRegister
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                        setIsExploding={setIsExploding} 
                    />
                }
            </section>
        </div>
    )
}

