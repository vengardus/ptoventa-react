import { useProductStore } from "../../../../stores/product.store"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const Search = () => {
    const setStrSearch = useProductStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch 
            setStrSearch={setStrSearch} 
        />
    )
}