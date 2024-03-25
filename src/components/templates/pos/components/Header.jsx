import { v } from "../../../../styles/variables"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import Clock from "../../../organismos/Clock"
import { TemplateBaseHeader } from "../../_base/TemplateBaseHeader"

export const Header = () => {
    return (
        <>
            <div className="w-3/12">
                <TemplateBaseHeader
                    justifyHeader="start"
                />
            </div>

            <div id='logo' className="flex items-center justify-end md:justify-center gap-3 w-9/12 md:w-6/12">
                <div className="w-[30px]">
                    <img src={v.logo} />
                </div>
                <h2>{APP_CONFIG.companyName}</h2>
            </div>

            <div className="md:flex flex-col text-center w-full md:w-3/12">
                <Clock />
            </div>

        </>
    )
}
