import { Error } from "../../components/moleculas/Error"
import { SpinnerLoader } from "../../components/moleculas/SpinnerLoader"
import { ConfigTemplate } from "../../components/templates/config/ConfigTemplate"
import { useModuleQuery } from "../../hooks/useModuleQuery"


export const ConfigPage = () => {
    const { isLoading, isError } = useModuleQuery()

    if (isLoading)
        return <SpinnerLoader />

    if (isError)
        return <Error />

    return (<ConfigTemplate />)
}

