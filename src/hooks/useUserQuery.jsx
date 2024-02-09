import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/user.store";


export const useUserQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const query = useQuery({
        queryKey: ["get_User"],
        queryFn: () => userGet()
    })

    return query
}