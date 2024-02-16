import { useQuery } from "@tanstack/react-query"
import { useCategoryStore } from "../stores/category.store"
import { useCompanyStore } from "../stores/company.store"

export const useCategoryQuery = () => {
    const currentCompany = useCompanyStore((state)=>state.currentCompany)
    const getAllCategory = useCategoryStore((state) => state.getAll)
    const filter = useCategoryStore((state) => state.filter)
    const strSearch = useCategoryStore((state) => state.strSearch)

    const query = useQuery({
        queryKey:['getAll_Category', currentCompany? currentCompany.id : 0],
        queryFn: () => getAllCategory({
            id_company: currentCompany? currentCompany.id : 0
        }),
        //enabled: currentCompany!=null,
        refetchOnWindowFocus: false,
    })

    // filtra por strSearch cada vez que se modifica
    useQuery({
        queryKey: ['filter_Category', currentCompany? currentCompany.id : 0, strSearch ],
      queryFn: () =>filter({
        id_company: currentCompany? currentCompany.id : 0,
        description: strSearch
      })
    })
  

    return query
}