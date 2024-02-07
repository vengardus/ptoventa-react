import { v } from "../../../styles/variables"
import { ContentFilter } from "../../atomos/ContentFilter"
import { BtnFilter } from "../../moleculas/BtnFilter"

export const TemplateBaseSectionTitle = ({
    title,
    actionRegister
}) => {
    return (
        <section id="sectionTitle" className="">
            <ContentFilter >
                <div className="title">{title}</div>
                <BtnFilter
                    bgColor={v.colorPrincipal}
                    textColor={'#353535'}
                    icon={<v.agregar />}
                    func={(action, data) => actionRegister(action, data)}
                />
            </ContentFilter>
        </section>
    )
}
