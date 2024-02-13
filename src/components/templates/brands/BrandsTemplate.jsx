import ConfettiExplosion from "react-confetti-explosion";
import { useBrandStore } from "../../../store/brand.store"
import { RegisterBrand } from "../../organismos/form/RegisterBrand"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { Search } from "./components/Search"
import { Table } from "./components/Table"

const title = "Marcas"

export const BrandsTemplate = () => {
    const brands = useBrandStore((state) => state.data)
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister,
        isExploding, setIsExploding
    } = useActionRegister(brands)


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
                    data={brands ?? []}
                    actionRegister={actionRegister}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterBrand
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

