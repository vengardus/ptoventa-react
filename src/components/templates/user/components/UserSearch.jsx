import { useUserStore } from "../../../../store/user.store"
import { TemplateBaseSectionSearch } from "../../_base/TemplateBaseSectionSearch"

export const UserSearch = () => {
    const setStrSearch = useUserStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}
