import { useQuery } from "@tanstack/react-query"
import { useProductStore } from "../stores/product.store"
import { useCompanyStore } from "../stores/company.store"


export const  useProductQuery = () => {
    const currentCompany = useCompanyStore((state)=>state.currentCompany)
    const getAllProduct = useProductStore((state) => state.getAll)
    const filter = useProductStore((state) => state.filter)
    const strSearch = useProductStore((state) => state.strSearch)

    const query = useQuery({
        queryKey:['getAll_Product', currentCompany? currentCompany.id : 0],
        queryFn: () => getAllProduct({
            id_company: currentCompany? currentCompany.id : 0
        }),
        enabled: currentCompany!=null,
        refetchOnWindowFocus: false,
    })

    // filtra por strSearch cada vez que se modifica
    useQuery({
        queryKey: ['filter_Product', currentCompany? currentCompany.id : 0, strSearch ],
      queryFn: () =>filter({
        id_company: currentCompany? currentCompany.id : 0,
        description: strSearch
      })
    })


    return query
}