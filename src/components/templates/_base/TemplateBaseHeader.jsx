import { useState } from "react"
import { Header } from "../../organismos/Header"

export const TemplateBaseHeader = ({
    justifyHeader = 'end'
}) => {
    const [state, setState] = useState(false)

    return (
        <header className="flex align-middle h-[70px]">
            <Header
                stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }}
                justify={justifyHeader}
            />
        </header>
    )
}
