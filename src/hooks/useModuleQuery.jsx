import { useQuery } from "@tanstack/react-query"
import { useModuleStore } from "../store/module.store"

export const useModuleQuery = () => {
    const getAll = useModuleStore((state) => state.getAll)

    const query = useQuery({
        queryKey: ['getAll_Module'],
        queryFn: getAll
    })

    return query
}