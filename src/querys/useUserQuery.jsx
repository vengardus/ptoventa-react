import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/UserStore";


export const useUserQuery = () => {
    const userGet = useUserStore((state) => state.get)
    const query = useQuery({
        queryKey: ["mostrar usuario"],
        queryFn: () => userGet()
    })

    return query
}