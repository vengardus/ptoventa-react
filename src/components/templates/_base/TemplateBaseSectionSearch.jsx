import { Searcher } from "../../organismos/Searcher"

export const TemplateBaseSectionSearch = ({setStrSearch}) => {

    return (
        <section className="sectionSearcher flex justify-end  ">
            <Searcher
                setSearcher={setStrSearch}
            />
        </section>
    )
}
