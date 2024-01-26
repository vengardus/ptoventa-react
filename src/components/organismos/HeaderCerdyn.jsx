import { ContentHeader } from "../atomos/ContentHeader"
import { DataUser } from "./DataUser"

/*
stateConfig {
    state,      // state
    setState    // func
}
*/

export const Header = ({ stateConfig }) => {
    return (
        <ContentHeader>
            <div onClick={(e) => e.stopPropagation()}>
                <DataUser stateConfig={stateConfig} />
            </div>
        </ContentHeader>
    )
}

