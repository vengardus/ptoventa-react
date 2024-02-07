import { useQuery } from "@tanstack/react-query"
import { useCategoryStore } from "../store/category.store"
import { useCompanyStore } from "../store/company.store"

export const useCategoryQuery = () => {
    const companies = useCompanyStore((state)=>state.data)

    const getAllCategory = useCategoryStore((state) => state.getAll)

    const query = useQuery({
        queryKey:['getAll_Category', companies? companies[0].id : 0],
        queryFn: () => getAllCategory({
            id_company: companies? companies[0].id : 0
        })
    })

    return query
}