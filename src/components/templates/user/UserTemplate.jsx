import { RegisterUser } from "../../organismos/forms/RegisterUser"
import { TemplateBaseHeader } from "../_base/TemplateBaseHeader"
import { TemplateBaseSectionTitle } from "../_base/TemplateBaseSectionTitle"
import { useActionRegister } from "../_base/utils/useActionRegister"
import { UserTable } from "./components/UserTable"
import { UserSearch } from "./components/UserSearch"

const title = 'Personal'

export const UserTemplate = ({ data }) => {
    const {
        action, openRegister, dataSelect,
        actionRegister, setOpenRegister
    } = useActionRegister(data)

    return (
        <div className="containerTemplate">
            <TemplateBaseHeader />

            <TemplateBaseSectionTitle
                title={title}
                // actionRegister={() => actionRegister()}
                actionRegister={({action, data}) => actionRegister({action, data})}
            />

            <UserSearch />

            <section id="sectionTable" className="px-2 flex flex-col gap-y-3">
                <UserTable
                    data={data ?? []}
                    actionRegister={actionRegister}
                />
            </section>

            <section id="sectionRegister" className="">
                {
                    openRegister && <RegisterUser
                        dataSelect={dataSelect}
                        action={action}
                        onClose={() => setOpenRegister(!openRegister)}
                    />
                }

            </section>
        </div>
    )
}

