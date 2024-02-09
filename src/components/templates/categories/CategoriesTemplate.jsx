import { useCategoryStore } from "../../../store/category.store"
import { RegisterCategory } from "../../organismos/form/RegisterCategory"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { Search } from "./components/Search"
import { Table } from "./components/Table"

const title = "Categorías"

export const CategoriesTemplate = () => {
    const categories = useCategoryStore((state)=>state.data)
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister
    } = useActionRegister(categories)

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                actionRegister={({action, data}) => actionRegister({action, data})}
            />

            <Search />

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
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
                    />
                }
            </section>
        </div>
    )
}

