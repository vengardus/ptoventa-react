import { useQuery } from "@tanstack/react-query"
import { useBrandStore } from "../stores/brand.store"
import { useCompanyStore } from "../stores/company.store"


export const useBrandQuery = () => {
    const currentCompany = useCompanyStore((state)=>state.currentCompany)
    const getAllBrand = useBrandStore((state) => state.getAll)
    const filter = useBrandStore((state) => state.filter)
    const strSearch = useBrandStore((state) => state.strSearch)

    const query = useQuery({
        queryKey:['getAll_Brand', currentCompany? currentCompany.id : 0],
        queryFn: () => getAllBrand({
            id_company: currentCompany? currentCompany.id : 0
        }),
        enabled: currentCompany!=null,
        refetchOnWindowFocus: false,
    })

    // filtra por strSearch cada vez que se modifica
    useQuery({
        queryKey: ['filter_Brand', currentCompany? currentCompany.id : 0, strSearch ],
      queryFn: () =>filter({
        id_company: currentCompany? currentCompany.id : 0,
        description: strSearch
      })
    })
  

    return query
}