
export const Search = () => {
    const setStrSearch = useCategoryStore((state) => state.setStrSearch)

    return (
        <TemplateBaseSectionSearch setStrSearch={setStrSearch} />
    )
}