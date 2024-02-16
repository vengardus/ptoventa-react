import { useUserStore } from '../stores/user.store'
import { useCompanyStore } from '../stores/company.store'
import { useQuery } from '@tanstack/react-query'

export const useInitLoadQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const companyGetByUser = useCompanyStore((state) => state.getByUser)
    // const getPermissionsLoggedInUser = useUserStore((state) => state.getPermissionsLoggedInUser)

    const queryUser =  useQuery({
        queryKey:['userGet'],
        queryFn: userGet,
        refetchOnWindowFocus: false
    })

    useQuery({
        queryKey: ['getCompanyByUser', queryUser.data?.id_auth?? ''], 
        queryFn: () => companyGetByUser({
            id_auth: queryUser.data?.id_auth?? ''
        }),
        enabled: queryUser.data?.id_auth != null,
        refetchOnWindowFocus: false
    })

    // useQuery({
    //     queryKey: ['getPermissionsLoggedInUser', queryUser.data?.id], 
    //     queryFn: () => getPermissionsLoggedInUser({
    //         id_user: queryUser.data?.id
    //     }),
    //     enabled: queryUser.data?.id != null
    // })

    if ( ! queryUser.data?.id_auth )
        return <div className='text-black bg-white'>...recuperando usuario</div>


    return {isLoading:queryUser.isLoading, isError:queryUser.isError }

}
