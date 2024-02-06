import { useQuery } from "@tanstack/react-query"
import { HomeTemplate } from "../../components/templates/home/HomeTemplate"
import { useCompanyStore } from "../../store/CompanyStore"

export const HomePage = () => {
  // const dataCompany = useCompanyStore((state) => state.data)
  // const getCountUsersCompany = useCompanyStore((state) => state.getCountUsersCompany)

  // useQuery({
  //   queryKey: ['getCountUsersCompany', dataCompany?.id],
  //   queryFn: () => getCountUsersCompany({
  //     id_company: dataCompany?.id
  //   }),
  //   enabled: !!dataCompany
  // })

  return (
    <HomeTemplate />
  )
}
