import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"

const title = "Categorías"

export const CategoriesTemplate = () => {

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                // actionRegister={() => actionRegister()}
                //actionRegister={({action, data}) => actionRegister({action, data})}
            />

            <section id="section2" className="">
            </section>

            <section className="">
            </section>
        </div>
    )
}

