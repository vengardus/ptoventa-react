import { useUserStore } from "../../../../stores/user.store"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const UserSearch = () => {
    const setStrSearch = useUserStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
