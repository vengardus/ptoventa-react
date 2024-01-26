import { useState } from "react"
import { Header } from "../../organismos/Header"

export const TemplateBaseHeader = () => {
    const [state, setState] = useState(false)

    return (
        <header className="flex align-middle h-[70px]">
            <Header
                stateConfig={{
                    state: state,
                    setState: () => setState(!state)
                }}
            />
        </header>
    )
}
