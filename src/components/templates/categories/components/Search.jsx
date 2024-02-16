import { useCategoryStore } from "../../../../stores/category.store"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const Search = () => {
    const setStrSearch = useCategoryStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch 
            setStrSearch={setStrSearch} 
        />
    )
}