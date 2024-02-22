import { useQuery } from "@tanstack/react-query"
import { useModuleStore } from "../stores/module.store"

export const useModuleQuery = () => {
    const getAll = useModuleStore((state) => state.getAll)

    const query = useQuery({
        queryKey: ['getAll_Module'],
        queryFn: getAll
    })

    console.log('Modules-response', query)

    return query
}