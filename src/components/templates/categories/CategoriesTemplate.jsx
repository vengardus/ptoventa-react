import { useCategoryStore } from "../../../store/category.store"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { Search } from "./components/Search"
import { Table } from "./components/Table"

const title = "Categorías"

export const CategoriesTemplate = () => {
    const categories = useCategoryStore((state)=>state.data)

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                // actionRegister={() => actionRegister()}
                //actionRegister={({action, data}) => actionRegister({action, data})}
            />

            <Search />

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
                <Table
                    data={categories ?? []}
                    //actionRegister={actionRegister}
                />
            </section>

            <section className="">
            </section>
        </div>
    )
}

