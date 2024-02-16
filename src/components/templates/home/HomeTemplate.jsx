import { useState } from "react"
import { Header } from "../../organismos/Header"
import { BannerCompany } from "../../organismos/BannerCompany"
import { useCompanyStore } from "../../../stores/company.store"

export const HomeTemplate = () => {
    const [state, setState] = useState(false)
    const dataCompany = useCompanyStore((state) => state.data)
    const countUsersCompany = useCompanyStore((state) => state.countUsersCompany)

    const test = async () => {
        // const {data, errorMessage} = await insertCompany(undefined)
        // console.log('insert-resp', data? 'OK': errorMessage)
        // console.log('Companies', dataCompany)
        // const oModel = new UserModel()
        // const data = oModel.insert_superadmin({
        //     p_id_auth
        // })
    }


    return (
        <div className="containerTemplate">
            <header className="flex align-middle h-[70px]">
                <Header
                    stateConfig={{
                        state: state,
                        setState: () => setState(!state)
                    }}
                />
            </header>

            <section id="section0" className="flex flex-col justify-end">
                <div>Test</div>
                <button onClick={test} className="border p-3">TEST</button>
            </section>

            <section id="section1" className="flex justify-end">
                <div className="title">EFR2-Soft</div>
            </section>

            <section className="h-screen w-100">
                <BannerCompany
                    companyName={dataCompany?.name}
                    currencySymbol={dataCompany?.currency_symbol}
                    countUsersCompany={countUsersCompany}
                />
            </section>


        </div>
    )
}

