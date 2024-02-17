import ConfettiExplosion from "react-confetti-explosion";
import { useCategoryStore } from "../../../stores/category.store"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { Search } from "./components/Search"
import { Table } from "./components/Table"
import { RegisterCategory } from "../../organismos/forms/category/RegisterCategory";

const title = "Categorías"

export const CategoriesTemplate = () => {
    const categories = useCategoryStore((state) => state.data)
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister,
        isExploding, setIsExploding
    } = useActionRegister(categories)


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
                    data={categories ?? []}
                    actionRegister={actionRegister}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterCategory
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

