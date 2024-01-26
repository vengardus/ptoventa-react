import { useUserStore } from '../store/UserStore'
import { useCompanyStore } from '../store/CompanyStore'
import { useQuery } from '@tanstack/react-query'

export const useInitLoadQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const getPermissionsLoggedInUser = useUserStore((state) => state.getPermissionsLoggedInUser)
    const companyGetByUser = useCompanyStore((state) => state.getByUser)

    const queryUser =  useQuery({
        queryKey:['userGet'],
        queryFn: userGet
    })

    useQuery({
        queryKey: ['getCompanyByUser', queryUser.data?.id], 
        queryFn: () => companyGetByUser({
            id_user: queryUser.data?.id
        }),
        enabled: queryUser.data?.id != null
    })

    useQuery({
        queryKey: ['getPermissionsLoggedInUser', queryUser.data?.id], 
        queryFn: () => getPermissionsLoggedInUser({
            id_user: queryUser.data?.id
        }),
        enabled: queryUser.data?.id != null
    })


    return {isLoading:queryUser.isLoading, isError:queryUser.isError }

}
