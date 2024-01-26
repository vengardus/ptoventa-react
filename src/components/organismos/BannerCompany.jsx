import { v } from "../../styles/variables"
import { CardCompany } from "../moleculas/CardCompany"

export const BannerCompany = ({
    companyName,
    currencySymbol,
    countUsersCompany
}) => {

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <span className="flex text-[30px] font-bold gap-[10px] items-center">
                {<v.iconoempresa />}
                {companyName}
            </span>
            <div>STOCK-EF2R siempre te mantiene informado</div>

            <div className="flex flex-col gap-[10px] pt-[15px] cursor-pointe sm:flex-row">
                <CardCompany
                    title={'Moneda'}
                    value={currencySymbol}
                />
                <CardCompany
                    title={'Usuarios'}
                    value={countUsersCompany}
                />
            </div>
        </div>
    )
}
