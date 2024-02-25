import { useQuery } from "@tanstack/react-query"
import { useBranchStore } from "../stores/branch.store"

export const useBranchQuery = () => {
    const getAll = useBranchStore(state => state.getAll)

    const query = useQuery({
        queryKey: ['getAll_Branch'],
        queryFn: getAll
    })

    return query
}
