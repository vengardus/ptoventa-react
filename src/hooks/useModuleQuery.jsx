import { useQuery } from "@tanstack/react-query"
import { useModuleStore } from "../stores/module.store"
import { useEffect } from "react"

export const useModuleQuery = () => {
    const getAll = useModuleStore((state) => state.getAll)

    const query = useQuery({
        queryKey: ['getAll_Module'],
        queryFn: getAll,
        staleTime: 0
    })

    useEffect(()=>{
        console.log('moduleQuery-response', query)
    }, [query])

    return query
}