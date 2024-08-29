import { useQuery } from "@tanstack/react-query"
import { useSaleStore } from "../stores/sale.store"
import { useCompanyStore } from "../stores/company.store"


export const  useSaleQuery = () => {
    const currentCompany = useCompanyStore((state)=>state.currentCompany)
    const getAllSale = useSaleStore((state) => state.getAll)

    const query = useQuery({
        queryKey:['getAll_Sale', currentCompany? currentCompany.id : 0],
        queryFn: () => getAllSale({
            id_company: currentCompany? currentCompany.id : 0
        }),
        enabled: currentCompany!=null,
        refetchOnWindowFocus: false,
    })

    return query
}