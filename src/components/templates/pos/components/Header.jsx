import { v } from "../../../../styles/variables"
import { APP_CONFIG } from "../../../../utils/dataEstatica"
import Clock from "../../../organismos/Clock"
import { TemplateBaseHeader } from "../../_base/TemplateBaseHeader"

export const Header = () => {
    return (
        <>
            <TemplateBaseHeader
                justifyHeader="start"
            />

            <div id='logo' className="flex items-center gap-3">
                <div className="w-[30px]">
                    <img src={v.logo} />
                </div>
                <h2>{APP_CONFIG.companyName}</h2>
            </div>

            <div className="flex flex-col text-center">
                <Clock />
            </div>
        </>
    )
}
